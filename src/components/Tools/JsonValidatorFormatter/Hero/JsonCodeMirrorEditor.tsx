import { Compartment, EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  placeholder as cmPlaceholder,
} from "@codemirror/view";
import {
  defaultKeymap,
  indentWithTab,
  historyKeymap,
  undo as cmUndo,
  redo as cmRedo,
  undoDepth,
  redoDepth,
} from "@codemirror/commands";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { foldAll, unfoldAll, syntaxTree } from "@codemirror/language";
import { search, openSearchPanel, closeSearchPanel } from "@codemirror/search";
import { linter, lintGutter } from "@codemirror/lint";
import type { Diagnostic } from "@codemirror/lint";
import { jsonrepair } from "jsonrepair";
import { xcodeLight, xcodeDark } from "@uiw/codemirror-theme-xcode";
import { basicSetup } from "codemirror";
import { indentationMarkers } from "@replit/codemirror-indentation-markers";
import React from "react";

// jsonrepair is greedy: an unclosed string like `"zip": "94105` causes it to
// consume subsequent lines as part of the string value, producing the wrong fix.
// This pre-pass closes any unclosed string VALUE on the same line before
// jsonrepair runs, so it sees `"zip": "94105"` instead.
//
// Pattern: a complete quoted key  +  colon  +  opening quote  +  value chars
//          that runs to end-of-line without a closing quote.
//          Escaped chars (\" \\ etc.) are handled by the (?:[^"\\]|\\.)* groups.
function preRepair(doc: string): string {
  return doc.replace(
    /^(\s*"(?:[^\n"\\]|\\.)*"\s*:\s*"(?:[^\n"\\]|\\.)*)$/gm,
    '$1"',
  );
}

// Wraps jsonParseLinter() with two improvements:
// 1. Replaces positions with Lezer syntax-tree error nodes — jsonParseLinter relies on
//    JSON.parse's "at position N" message which modern V8 no longer emits, causing
//    every error to land on line 1.
// 2. Appends a "Repair JSON" action (via jsonrepair) when the document can be fixed.
function jsonRepairLinter() {
  const base = jsonParseLinter();
  return (view: EditorView): readonly Diagnostic[] => {
    const baseDiags = base(view) as Diagnostic[];
    if (baseDiags.length === 0) return [];

    // Re-derive positions from the Lezer tree (always accurate).
    const lezerDiags: Diagnostic[] = [];
    syntaxTree(view.state).cursor().iterate((node) => {
      if (node.type.isError) {
        lezerDiags.push({
          from: node.from,
          to: Math.max(node.to, node.from + 1),
          severity: "error",
          message: baseDiags[0].message,
        });
      }
    });
    const diags = lezerDiags.length > 0 ? lezerDiags : baseDiags;

    // Add repair action if jsonrepair (with pre-pass) can fix the document.
    let canRepair = false;
    try { jsonrepair(preRepair(view.state.doc.toString())); canRepair = true; } catch {}
    if (!canRepair) return diags;

    return diags.map((d) => ({
      ...d,
      actions: [
        {
          name: "Repair JSON",
          apply(v: EditorView) {
            try {
              const fixed = jsonrepair(preRepair(v.state.doc.toString()));
              v.dispatch({ changes: { from: 0, to: v.state.doc.length, insert: fixed } });
            } catch {}
          },
        },
      ],
    }));
  };
}

export interface JsonCodeMirrorEditorHandle {
  toggleSearch: () => void;
  foldAll: () => void;
  unfoldAll: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

export interface JsonCodeMirrorEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  colorMode?: "light" | "dark";
  placeholder?: string;
  minHeight?: string;
  readOnly?: boolean;
  syntaxHighlight?: boolean;
  showLineNumbers?: boolean;
  wordWrap?: boolean;
  fontSize?: number;
  editorRef?: React.Ref<JsonCodeMirrorEditorHandle>;
}

// ── Component ─────────────────────────────────────────────────────────────────

const JsonCodeMirrorEditor: React.FC<JsonCodeMirrorEditorProps> = ({
  value = "",
  onChange,
  colorMode = "light",
  placeholder,
  minHeight = "300px",
  readOnly = false,
  syntaxHighlight = true,
  showLineNumbers = true,
  wordWrap = true,
  fontSize = 14,
  editorRef,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const viewRef = React.useRef<EditorView | null>(null);

  React.useImperativeHandle(editorRef, () => ({
    toggleSearch: () => {
      const view = viewRef.current;
      if (!view) return;
      if (!closeSearchPanel(view)) openSearchPanel(view);
    },
    foldAll: () => {
      const view = viewRef.current;
      if (view) foldAll(view);
    },
    unfoldAll: () => {
      const view = viewRef.current;
      if (view) unfoldAll(view);
    },
    undo: () => {
      const view = viewRef.current;
      if (view) cmUndo(view);
    },
    redo: () => {
      const view = viewRef.current;
      if (view) cmRedo(view);
    },
    canUndo: () => {
      const view = viewRef.current;
      return !!view && undoDepth(view.state) > 0;
    },
    canRedo: () => {
      const view = viewRef.current;
      return !!view && redoDepth(view.state) > 0;
    },
  }));

  // Per-instance compartments — stable across renders.
  const themeComp = React.useRef(new Compartment()).current;
  const syntaxComp = React.useRef(new Compartment()).current;
  const wordWrapComp = React.useRef(new Compartment()).current;
  const lineNumComp = React.useRef(new Compartment()).current;
  const fontSizeComp = React.useRef(new Compartment()).current;

  // Keep onChange stable without triggering editor recreations.
  const onChangeRef = React.useRef(onChange);
  React.useEffect(() => {
    onChangeRef.current = onChange;
  });

  // ── Create editor on mount ──────────────────────────────────────────────────
  React.useEffect(() => {
    if (!containerRef.current) return;

    // Chakra UI's global button reset strips background/border/padding from all
    // <button> elements. CodeMirror's baseTheme sets these but at lower
    // specificity. This scoped theme overrides the reset for lint action buttons.
    const lintUiTheme = EditorView.theme({
      ".cm-tooltip.cm-tooltip-lint": {
        borderRadius: "6px",
        overflow: "hidden",
      },
      // Stack message and button vertically. The generated theme class is placed
      // on the tooltip element itself, so descendant selectors work from here.
      ".cm-diagnostic": {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "6px",
      },
      ".cm-diagnosticAction": {
        display: "inline-block",
        cursor: "pointer",
        font: "inherit",
        fontSize: "11px",
        fontWeight: "600",
        lineHeight: "1.4",
        padding: "4px 10px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#2563eb",
        color: "#fff",
      },
      ".cm-diagnosticAction + .cm-diagnosticAction": {
        marginLeft: "4px",
      },
    });

    const extensions = [
      basicSetup,
      search({ top: true }),
      lintUiTheme,
      indentationMarkers(),
      syntaxComp.of(syntaxHighlight ? json() : []),
      themeComp.of(colorMode === "dark" ? xcodeDark : xcodeLight),
      wordWrapComp.of(wordWrap ? EditorView.lineWrapping : []),
      lineNumComp.of(
        showLineNumbers
          ? []
          : EditorView.theme({
              ".cm-gutters": { display: "none" },
              ".cm-content": { paddingLeft: "4px" },
            }),
      ),
      fontSizeComp.of(
        EditorView.theme({
          ".cm-scroller": { fontSize: `${fontSize}px` },
        }),
      ),
      linter(jsonRepairLinter()),
      lintGutter(),
      keymap.of([indentWithTab, ...defaultKeymap, ...historyKeymap]),
      EditorView.editable.of(!readOnly),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChangeRef.current?.(update.state.doc.toString());
        }
      }),
      ...(placeholder ? [cmPlaceholder(placeholder)] : []),
    ];

    const view = new EditorView({
      state: EditorState.create({ doc: value, extensions }),
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Dynamic reconfiguration ────────────────────────────────────────────────

  React.useEffect(() => {
    viewRef.current?.dispatch({
      effects: themeComp.reconfigure(
        colorMode === "dark" ? xcodeDark : xcodeLight,
      ),
    });
  }, [colorMode]);

  React.useEffect(() => {
    viewRef.current?.dispatch({
      effects: syntaxComp.reconfigure(syntaxHighlight ? json() : []),
    });
  }, [syntaxHighlight]);

  React.useEffect(() => {
    viewRef.current?.dispatch({
      effects: wordWrapComp.reconfigure(
        wordWrap ? EditorView.lineWrapping : [],
      ),
    });
  }, [wordWrap]);

  React.useEffect(() => {
    viewRef.current?.dispatch({
      effects: lineNumComp.reconfigure(
        showLineNumbers
          ? []
          : EditorView.theme({
              ".cm-gutters": { display: "none" },
              ".cm-content": { paddingLeft: "4px" },
            }),
      ),
    });
  }, [showLineNumbers]);

  React.useEffect(() => {
    viewRef.current?.dispatch({
      effects: fontSizeComp.reconfigure(
        EditorView.theme({
          ".cm-scroller": { fontSize: `${fontSize}px` },
        }),
      ),
    });
  }, [fontSize]);

  // ── Sync external value changes ────────────────────────────────────────────
  React.useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: value },
      });
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      style={{ minHeight, width: "100%", height: "100%" }}
    />
  );
};

export default JsonCodeMirrorEditor;

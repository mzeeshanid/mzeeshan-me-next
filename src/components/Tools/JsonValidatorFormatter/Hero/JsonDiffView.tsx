import { ChangeSet, Compartment, EditorState, Text } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, historyKeymap } from "@codemirror/commands";
import { json } from "@codemirror/lang-json";
import {
  MergeView,
  getOriginalDoc,
  unifiedMergeView,
  updateOriginalDoc,
} from "@codemirror/merge";
import { xcodeLight, xcodeDark } from "@uiw/codemirror-theme-xcode";
import { basicSetup } from "codemirror";
import { indentationMarkers } from "@replit/codemirror-indentation-markers";
import React from "react";

export interface JsonDiffViewProps {
  original: string;
  modified: string;
  onOriginalChange?: (value: string) => void;
  onModifiedChange?: (value: string) => void;
  colorMode?: "light" | "dark";
  syntaxHighlight?: boolean;
  showLineNumbers?: boolean;
  wordWrap?: boolean;
  fontSize?: number;
}

// Chakra UI's global button reset strips styles from all <button> elements.
// This scoped theme restores them for CodeMirror merge chunk controls.
const mergeUiTheme = EditorView.theme({
  ".cm-mergeControl": {
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "11px",
    fontWeight: "600",
    lineHeight: "1.4",
    padding: "4px 12px",
    borderRadius: "4px",
    border: "none",
    transition: "opacity 0.15s",
  },
  ".cm-mergeControl:hover": {
    opacity: "0.82",
  },
  ".cm-mergeControl[data-action='accept']": {
    backgroundColor: "#16a34a",
    color: "#fff",
    marginRight: "4px",
  },
  ".cm-mergeControl[data-action='reject']": {
    backgroundColor: "#dc2626",
    color: "#fff",
  },
});

// Custom renderer for unified-view accept/reject buttons.
// Using a renderer (vs mergeControls: true) lets us add title tooltips and
// control padding — Chakra's global button reset would otherwise strip styles.
function renderMergeControl(
  type: "accept" | "reject",
  action: (e: MouseEvent) => void,
): HTMLElement {
  const btn = document.createElement("button");
  btn.className = "cm-mergeControl";
  btn.setAttribute("data-action", type);
  btn.textContent = type === "accept" ? "Accept" : "Reject";
  btn.title =
    type === "accept"
      ? "Accept – keep this change in the modified document"
      : "Reject – revert this change back to the original";
  btn.addEventListener("click", action);
  return btn;
}

// ── Side-by-side (MergeView) ──────────────────────────────────────────────────

export const JsonSideBySideDiff: React.FC<JsonDiffViewProps> = ({
  original = "",
  modified = "",
  onOriginalChange,
  onModifiedChange,
  colorMode = "light",
  syntaxHighlight = true,
  showLineNumbers = true,
  wordWrap = true,
  fontSize = 14,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const viewRef = React.useRef<MergeView | null>(null);

  const aComps = React.useRef({
    theme: new Compartment(),
    syntax: new Compartment(),
    wrap: new Compartment(),
    lineNum: new Compartment(),
    font: new Compartment(),
  }).current;

  const bComps = React.useRef({
    theme: new Compartment(),
    syntax: new Compartment(),
    wrap: new Compartment(),
    lineNum: new Compartment(),
    font: new Compartment(),
  }).current;

  const onOrigRef = React.useRef(onOriginalChange);
  const onModRef = React.useRef(onModifiedChange);
  React.useEffect(() => { onOrigRef.current = onOriginalChange; });
  React.useEffect(() => { onModRef.current = onModifiedChange; });

  React.useEffect(() => {
    if (!containerRef.current) return;

    const editorExts = (
      comps: typeof aComps,
      onChange: (v: string) => void,
    ) => [
      basicSetup,
      mergeUiTheme,
      comps.syntax.of(syntaxHighlight ? json() : []),
      comps.theme.of(colorMode === "dark" ? xcodeDark : xcodeLight),
      comps.wrap.of(wordWrap ? EditorView.lineWrapping : []),
      comps.lineNum.of(
        showLineNumbers
          ? []
          : EditorView.theme({
              ".cm-gutters": { display: "none" },
              ".cm-content": { paddingLeft: "4px" },
            }),
      ),
      comps.font.of(
        EditorView.theme({ ".cm-scroller": { fontSize: `${fontSize}px` } }),
      ),
      indentationMarkers(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      EditorView.updateListener.of((u) => {
        if (u.docChanged) onChange(u.state.doc.toString());
      }),
    ];

    const mv = new MergeView({
      a: {
        doc: original,
        extensions: editorExts(aComps, (v) => onOrigRef.current?.(v)),
      },
      b: {
        doc: modified,
        extensions: editorExts(bComps, (v) => onModRef.current?.(v)),
      },
      parent: containerRef.current,
      highlightChanges: true,
      gutter: true,
    });

    mv.dom.style.width = "100%";
    mv.dom.style.height = "100%";

    viewRef.current = mv;
    return () => {
      mv.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Sync content ────────────────────────────────────────────────────────────

  React.useEffect(() => {
    const mv = viewRef.current;
    if (!mv || mv.a.state.doc.toString() === original) return;
    mv.a.dispatch({
      changes: { from: 0, to: mv.a.state.doc.length, insert: original },
    });
  }, [original]);

  React.useEffect(() => {
    const mv = viewRef.current;
    if (!mv || mv.b.state.doc.toString() === modified) return;
    mv.b.dispatch({
      changes: { from: 0, to: mv.b.state.doc.length, insert: modified },
    });
  }, [modified]);

  // ── Dynamic reconfiguration ─────────────────────────────────────────────────

  React.useEffect(() => {
    const mv = viewRef.current;
    if (!mv) return;
    const theme = colorMode === "dark" ? xcodeDark : xcodeLight;
    mv.a.dispatch({ effects: aComps.theme.reconfigure(theme) });
    mv.b.dispatch({ effects: bComps.theme.reconfigure(theme) });
  }, [colorMode]);

  React.useEffect(() => {
    const mv = viewRef.current;
    if (!mv) return;
    const ext = syntaxHighlight ? json() : [];
    mv.a.dispatch({ effects: aComps.syntax.reconfigure(ext) });
    mv.b.dispatch({ effects: bComps.syntax.reconfigure(ext) });
  }, [syntaxHighlight]);

  React.useEffect(() => {
    const mv = viewRef.current;
    if (!mv) return;
    const ext = wordWrap ? EditorView.lineWrapping : [];
    mv.a.dispatch({ effects: aComps.wrap.reconfigure(ext) });
    mv.b.dispatch({ effects: bComps.wrap.reconfigure(ext) });
  }, [wordWrap]);

  React.useEffect(() => {
    const mv = viewRef.current;
    if (!mv) return;
    const ext = showLineNumbers
      ? []
      : EditorView.theme({
          ".cm-gutters": { display: "none" },
          ".cm-content": { paddingLeft: "4px" },
        });
    mv.a.dispatch({ effects: aComps.lineNum.reconfigure(ext) });
    mv.b.dispatch({ effects: bComps.lineNum.reconfigure(ext) });
  }, [showLineNumbers]);

  React.useEffect(() => {
    const mv = viewRef.current;
    if (!mv) return;
    const ext = EditorView.theme({
      ".cm-scroller": { fontSize: `${fontSize}px` },
    });
    mv.a.dispatch({ effects: aComps.font.reconfigure(ext) });
    mv.b.dispatch({ effects: bComps.font.reconfigure(ext) });
  }, [fontSize]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", overflow: "auto" }}
    />
  );
};

// ── Unified merge view ────────────────────────────────────────────────────────

export const JsonUnifiedDiff: React.FC<JsonDiffViewProps> = ({
  original = "",
  modified = "",
  onModifiedChange,
  colorMode = "light",
  syntaxHighlight = true,
  showLineNumbers = true,
  wordWrap = true,
  fontSize = 14,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const viewRef = React.useRef<EditorView | null>(null);

  const comps = React.useRef({
    theme: new Compartment(),
    syntax: new Compartment(),
    wrap: new Compartment(),
    lineNum: new Compartment(),
    font: new Compartment(),
  }).current;

  const onModRef = React.useRef(onModifiedChange);
  React.useEffect(() => { onModRef.current = onModifiedChange; });

  React.useEffect(() => {
    if (!containerRef.current) return;

    const view = new EditorView({
      state: EditorState.create({
        doc: modified,
        extensions: [
          basicSetup,
          mergeUiTheme,
          comps.syntax.of(syntaxHighlight ? json() : []),
          comps.theme.of(colorMode === "dark" ? xcodeDark : xcodeLight),
          comps.wrap.of(wordWrap ? EditorView.lineWrapping : []),
          comps.lineNum.of(
            showLineNumbers
              ? []
              : EditorView.theme({
                  ".cm-gutters": { display: "none" },
                  ".cm-content": { paddingLeft: "4px" },
                }),
          ),
          comps.font.of(
            EditorView.theme({ ".cm-scroller": { fontSize: `${fontSize}px` } }),
          ),
          indentationMarkers(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          unifiedMergeView({
            original,
            highlightChanges: true,
            gutter: true,
            mergeControls: renderMergeControl,
          }),
          EditorView.updateListener.of((u) => {
            if (u.docChanged) onModRef.current?.(u.state.doc.toString());
          }),
        ],
      }),
      parent: containerRef.current,
    });

    viewRef.current = view;
    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Sync content ────────────────────────────────────────────────────────────

  React.useEffect(() => {
    const view = viewRef.current;
    if (!view || view.state.doc.toString() === modified) return;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: modified },
    });
  }, [modified]);

  React.useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const oldDoc = getOriginalDoc(view.state);
    if (oldDoc.toString() === original) return;
    const newDoc = Text.of(original.split("\n"));
    const changes = ChangeSet.of(
      { from: 0, to: oldDoc.length, insert: original },
      oldDoc.length,
    );
    view.dispatch({ effects: updateOriginalDoc.of({ doc: newDoc, changes }) });
  }, [original]);

  // ── Dynamic reconfiguration ─────────────────────────────────────────────────

  React.useEffect(() => {
    viewRef.current?.dispatch({
      effects: comps.theme.reconfigure(
        colorMode === "dark" ? xcodeDark : xcodeLight,
      ),
    });
  }, [colorMode]);

  React.useEffect(() => {
    viewRef.current?.dispatch({
      effects: comps.syntax.reconfigure(syntaxHighlight ? json() : []),
    });
  }, [syntaxHighlight]);

  React.useEffect(() => {
    viewRef.current?.dispatch({
      effects: comps.wrap.reconfigure(wordWrap ? EditorView.lineWrapping : []),
    });
  }, [wordWrap]);

  React.useEffect(() => {
    viewRef.current?.dispatch({
      effects: comps.lineNum.reconfigure(
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
      effects: comps.font.reconfigure(
        EditorView.theme({ ".cm-scroller": { fontSize: `${fontSize}px` } }),
      ),
    });
  }, [fontSize]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", overflow: "auto" }}
    />
  );
};

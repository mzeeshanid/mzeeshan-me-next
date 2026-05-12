import { Compartment, EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, historyKeymap } from "@codemirror/commands";
import { json } from "@codemirror/lang-json";
import { yaml } from "@codemirror/lang-yaml";
import { xml } from "@codemirror/lang-xml";
import { javascript } from "@codemirror/lang-javascript";
import { xcodeLight, xcodeDark } from "@uiw/codemirror-theme-xcode";
import { basicSetup } from "codemirror";
import { indentationMarkers } from "@replit/codemirror-indentation-markers";
import React from "react";

export type OutputLanguage = "json" | "yaml" | "xml" | "typescript" | "csv";

export interface JsonConverterOutputEditorProps {
  value?: string;
  language?: OutputLanguage;
  colorMode?: "light" | "dark";
  syntaxHighlight?: boolean;
  showLineNumbers?: boolean;
  wordWrap?: boolean;
  fontSize?: number;
  minHeight?: string;
}

function langExtension(lang: OutputLanguage, enabled: boolean) {
  if (!enabled) return [];
  switch (lang) {
    case "yaml":       return yaml();
    case "xml":        return xml();
    case "typescript": return javascript({ typescript: true });
    case "json":       return json();
    default:           return [];
  }
}

const JsonConverterOutputEditor: React.FC<JsonConverterOutputEditorProps> = ({
  value = "",
  language = "csv",
  colorMode = "light",
  syntaxHighlight = true,
  showLineNumbers = true,
  wordWrap = true,
  fontSize = 14,
  minHeight = "300px",
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const viewRef = React.useRef<EditorView | null>(null);

  const themeComp   = React.useRef(new Compartment()).current;
  const syntaxComp  = React.useRef(new Compartment()).current;
  const wrapComp    = React.useRef(new Compartment()).current;
  const lineNumComp = React.useRef(new Compartment()).current;
  const fontComp    = React.useRef(new Compartment()).current;

  React.useEffect(() => {
    if (!containerRef.current) return;

    const view = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          indentationMarkers(),
          syntaxComp.of(langExtension(language, syntaxHighlight)),
          themeComp.of(colorMode === "dark" ? xcodeDark : xcodeLight),
          wrapComp.of(wordWrap ? EditorView.lineWrapping : []),
          lineNumComp.of(
            showLineNumbers
              ? []
              : EditorView.theme({
                  ".cm-gutters":  { display: "none" },
                  ".cm-content":  { paddingLeft: "4px" },
                }),
          ),
          fontComp.of(
            EditorView.theme({ ".cm-scroller": { fontSize: `${fontSize}px` } }),
          ),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          EditorView.editable.of(false),
          EditorView.contentAttributes.of({ "aria-readonly": "true" }),
        ],
      }),
      parent: containerRef.current,
    });

    viewRef.current = view;
    return () => { view.destroy(); viewRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync value
  React.useEffect(() => {
    const view = viewRef.current;
    if (!view || view.state.doc.toString() === value) return;
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: value } });
  }, [value]);

  // Dynamic reconfiguration
  React.useEffect(() => {
    viewRef.current?.dispatch({
      effects: themeComp.reconfigure(colorMode === "dark" ? xcodeDark : xcodeLight),
    });
  }, [colorMode]);

  React.useEffect(() => {
    viewRef.current?.dispatch({
      effects: syntaxComp.reconfigure(langExtension(language, syntaxHighlight)),
    });
  }, [syntaxHighlight, language]);

  React.useEffect(() => {
    viewRef.current?.dispatch({
      effects: wrapComp.reconfigure(wordWrap ? EditorView.lineWrapping : []),
    });
  }, [wordWrap]);

  React.useEffect(() => {
    viewRef.current?.dispatch({
      effects: lineNumComp.reconfigure(
        showLineNumbers
          ? []
          : EditorView.theme({
              ".cm-gutters":  { display: "none" },
              ".cm-content":  { paddingLeft: "4px" },
            }),
      ),
    });
  }, [showLineNumbers]);

  React.useEffect(() => {
    viewRef.current?.dispatch({
      effects: fontComp.reconfigure(
        EditorView.theme({ ".cm-scroller": { fontSize: `${fontSize}px` } }),
      ),
    });
  }, [fontSize]);

  return (
    <div ref={containerRef} style={{ minHeight, width: "100%" }} />
  );
};

export default JsonConverterOutputEditor;

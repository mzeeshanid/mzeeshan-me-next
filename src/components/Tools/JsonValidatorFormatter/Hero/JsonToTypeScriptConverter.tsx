import { jsonConverterHeroDataByTab, jsonValidatorFormatterDefaultJson } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React from "react";
import { jsonToTypeScript, validateJson } from "./jsonValidatorFormatterUtils";
import JsonConverterPanel from "./JsonConverterPanel";

const heroData = jsonConverterHeroDataByTab.typescript;

/** Generates TypeScript interfaces from a JSON value. All logic is self-contained. */
const JsonToTypeScriptConverter: React.FC = () => {
  const [input, setInput] = React.useState(jsonValidatorFormatterDefaultJson);
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [tsExportStyle, setTsExportStyle] = useLocalStorage<"interface" | "type">("mz-json-ts-export-style", "interface");
  const [tsOptionalFields, setTsOptionalFields] = useLocalStorage<"all" | "nulls-only">("mz-json-ts-optional-fields", "nulls-only");

  const handleConvert = (processedInput: string, opts: { sortKeys: boolean; sortOrder: "asc" | "desc"; allowComments: boolean }) => {
    const { value, error: parseError } = validateJson(processedInput, { sortKeys: opts.sortKeys, sortOrder: opts.sortOrder, allowComments: opts.allowComments });
    if (parseError) {
      setError(parseError.message);
      setOutput("");
      return;
    }
    try {
      setOutput(jsonToTypeScript(value!, "Root", { exportStyle: tsExportStyle, optionalFields: tsOptionalFields }));
      setError(undefined);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed");
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(undefined);
  };

  const handleResetToolSettings = () => {
    setTsExportStyle("interface");
    setTsOptionalFields("nulls-only");
  };

  return (
    <JsonConverterPanel
      storageKey="typescript"
      toolId="typescript"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      outputError={error}
      inputLabel={heroData.inputLabel}
      outputLabel={heroData.outputLabel}
      convertButtonLabel={heroData.convertButtonLabel}
      inputHint={heroData.inputHint}
      onConvert={handleConvert}
      onClear={handleClear}
      tsExportStyle={tsExportStyle}
      onTsExportStyleChange={setTsExportStyle}
      tsOptionalFields={tsOptionalFields}
      onTsOptionalFieldsChange={setTsOptionalFields}
      onResetToolSettings={handleResetToolSettings}
    />
  );
};

export default JsonToTypeScriptConverter;

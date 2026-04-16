import { jsonConverterHeroDataByTab, jsonValidatorFormatterDefaultJson } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React from "react";
import { jsonToYaml, validateJson } from "./jsonValidatorFormatterUtils";
import JsonConverterPanel from "./JsonConverterPanel";

const heroData = jsonConverterHeroDataByTab.yaml;

/** Converts a JSON value to YAML. All logic is self-contained. */
const JsonToYamlConverter: React.FC = () => {
  const [input, setInput] = React.useState(jsonValidatorFormatterDefaultJson);
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [yamlQuoteStyle, setYamlQuoteStyle] = useLocalStorage<"minimal" | "always">("mz-json-yaml-quote-style", "minimal");

  const handleConvert = (processedInput: string, opts: { sortKeys: boolean; sortOrder: "asc" | "desc"; allowComments: boolean }) => {
    const { value, error: parseError } = validateJson(processedInput, { sortKeys: opts.sortKeys, sortOrder: opts.sortOrder, allowComments: opts.allowComments });
    if (parseError) {
      setError(parseError.message);
      setOutput("");
      return;
    }
    try {
      setOutput(jsonToYaml(value!, yamlQuoteStyle));
      setError(undefined);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(undefined);
  };

  const handleResetToolSettings = () => {
    setYamlQuoteStyle("minimal");
  };

  return (
    <JsonConverterPanel
      storageKey="yaml"
      toolId="yaml"
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
      yamlQuoteStyle={yamlQuoteStyle}
      onYamlQuoteStyleChange={setYamlQuoteStyle}
      onResetToolSettings={handleResetToolSettings}
    />
  );
};

export default JsonToYamlConverter;

import { jsonConverterHeroDataByTab, jsonValidatorFormatterDefaultJson } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React from "react";
import { jsonToXml, validateJson } from "./jsonValidatorFormatterUtils";
import JsonConverterPanel from "./JsonConverterPanel";

const heroData = jsonConverterHeroDataByTab.xml;

/** Converts a JSON value to XML. All logic is self-contained. */
const JsonToXmlConverter: React.FC = () => {
  const [input, setInput] = React.useState(jsonValidatorFormatterDefaultJson);
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [xmlRootTag, setXmlRootTag] = useLocalStorage("mz-json-xml-root-tag", "root");

  const handleConvert = (processedInput: string, opts: { sortKeys: boolean; sortOrder: "asc" | "desc"; allowComments: boolean }) => {
    const { value, error: parseError } = validateJson(processedInput, { sortKeys: opts.sortKeys, sortOrder: opts.sortOrder, allowComments: opts.allowComments });
    if (parseError) {
      setError(parseError.message);
      setOutput("");
      return;
    }
    try {
      setOutput(jsonToXml(value!, xmlRootTag));
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
    setXmlRootTag("root");
  };

  return (
    <JsonConverterPanel
      storageKey="xml"
      toolId="xml"
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
      xmlRootTag={xmlRootTag}
      onXmlRootTagChange={setXmlRootTag}
      onResetToolSettings={handleResetToolSettings}
    />
  );
};

export default JsonToXmlConverter;

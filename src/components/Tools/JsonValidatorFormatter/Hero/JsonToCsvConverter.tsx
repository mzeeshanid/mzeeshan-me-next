import { jsonConverterHeroDataByTab, jsonValidatorFormatterDefaultJson } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React from "react";
import { jsonToCsv, validateJson } from "./jsonValidatorFormatterUtils";
import JsonConverterPanel from "./JsonConverterPanel";

const heroData = jsonConverterHeroDataByTab.csv;

const getDefaultCsvDelimiter = (): string => {
  if (typeof navigator === "undefined") return ",";
  const lang = navigator.language || "";
  // European locales that commonly use semicolons
  const semicolonLocales = /^(de|fr|es|it|pt|nl|pl|cs|sk|hu|ro|bg|hr|sl|sr|mk|sq|bs)/i;
  return semicolonLocales.test(lang) ? ";" : ",";
};

/** Converts a JSON array or object to CSV. All logic is self-contained. */
const JsonToCsvConverter: React.FC = () => {
  const [input, setInput] = React.useState(jsonValidatorFormatterDefaultJson);
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [csvDelimiter, setCsvDelimiter] = useLocalStorage("mz-json-csv-delimiter", ",");

  // On first mount, if no stored value, use locale default
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("mz-json-csv-delimiter");
    if (stored === null) {
      setCsvDelimiter(getDefaultCsvDelimiter());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConvert = (processedInput: string, opts: { sortKeys: boolean; sortOrder: "asc" | "desc"; allowComments: boolean }) => {
    const { value, error: parseError } = validateJson(processedInput, { sortKeys: opts.sortKeys, sortOrder: opts.sortOrder, allowComments: opts.allowComments });
    if (parseError) {
      setError(parseError.message);
      setOutput("");
      return;
    }
    try {
      setOutput(jsonToCsv(value!, csvDelimiter));
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
    setCsvDelimiter(getDefaultCsvDelimiter());
  };

  return (
    <JsonConverterPanel
      storageKey="csv"
      toolId="csv"
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
      csvDelimiter={csvDelimiter}
      onCsvDelimiterChange={setCsvDelimiter}
      onResetToolSettings={handleResetToolSettings}
    />
  );
};

export default JsonToCsvConverter;

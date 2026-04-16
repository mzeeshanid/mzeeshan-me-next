import { useColorPalette } from "@/contexts/useColorPalette";
import { Combobox, createListCollection } from "@chakra-ui/react";
import React from "react";

const SYSTEM_FONTS = [
  "System Default",
  "Arial",
  "Arial Black",
  "Arial Narrow",
  "Baskerville",
  "Bookman",
  "Century Gothic",
  "Comic Sans MS",
  "Courier New",
  "Didot",
  "Futura",
  "Garamond",
  "Georgia",
  "Gill Sans",
  "Helvetica",
  "Impact",
  "Lucida Console",
  "Lucida Sans",
  "Optima",
  "Palatino",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
];

const cssFontFamily = (f: string) =>
  f === "System Default" ? "system-ui, sans-serif" : `"${f}", sans-serif`;

interface Props {
  value: string;
  onChange: (font: string) => void;
}

const AppIconGeneratorFontSelector: React.FC<Props> = ({ value, onChange }) => {
  const { palette } = useColorPalette();
  const [search, setSearch] = React.useState("");

  const currentValue = value || "System Default";

  const collection = React.useMemo(() => {
    const lower = search.toLowerCase();
    const filtered = search.trim()
      ? SYSTEM_FONTS.filter((f) => f.toLowerCase().includes(lower))
      : SYSTEM_FONTS;
    return createListCollection({
      items: filtered.map((f) => ({ value: f, label: f })),
    });
  }, [search]);

  return (
    <Combobox.Root
      size="sm"
      colorPalette={palette}
      collection={collection}
      value={[currentValue]}
      onValueChange={(d) => {
        if (d.value[0]) onChange(d.value[0]);
        else onChange("System Default");
      }}
      onInputValueChange={(d) => setSearch(d.inputValue)}
      onOpenChange={({ open }) => {
        if (!open) setSearch("");
      }}
      width="200px"
    >
      <Combobox.Control>
        <Combobox.Input placeholder="System Default" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content maxH="200px" overflowY="auto">
          <Combobox.Empty>No fonts found</Combobox.Empty>
          {collection.items.map((item) => (
            <Combobox.Item key={item.value} item={item}>
              <Combobox.ItemText
                style={{ fontFamily: cssFontFamily(item.value) }}
              >
                {item.label}
              </Combobox.ItemText>
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
};

export default AppIconGeneratorFontSelector;

import { useColorPalette } from "@/contexts/useColorPalette";
import {
  SegmentGroup,
  Select,
  Switch,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import React from "react";
import type { AndroidOptionsConfig, LegacyShape } from "./AppIconGeneratorAndroidTypes";
import AppIconGeneratorSettingsSection from "./AppIconGeneratorSettingsSection";

const LEGACY_SHAPES: { label: string; value: LegacyShape }[] = [
  { label: "None", value: "none" },
  { label: "Circle", value: "circle" },
  { label: "Square", value: "square" },
  { label: "Horizontal", value: "horizontal" },
  { label: "Vertical", value: "vertical" },
];

const shapeCollection = createListCollection({ items: LEGACY_SHAPES });

interface Props {
  config: AndroidOptionsConfig;
  onChange: (config: AndroidOptionsConfig) => void;
}

const AppIconGeneratorAndroidOptionsTab: React.FC<Props> = ({ config, onChange }) => {
  const { palette } = useColorPalette();

  const update = (patch: Partial<AndroidOptionsConfig>) =>
    onChange({ ...config, ...patch });

  const sections = [
    {
      title: "Legacy Icon (API ≤ 25)",
      items: [
        {
          label: "Generate",
          control: (
            <Switch.Root
              colorPalette={palette}
              checked={config.legacy.generate}
              onCheckedChange={(d) =>
                update({ legacy: { ...config.legacy, generate: !!d.checked } })
              }
            >
              <Switch.HiddenInput />
              <Switch.Control />
            </Switch.Root>
          ),
        },
        {
          label: "Shape",
          hidden: !config.legacy.generate,
          control: (
            <Select.Root
              collection={shapeCollection}
              value={[config.legacy.shape]}
              onValueChange={(d) =>
                update({ legacy: { ...config.legacy, shape: d.value[0] as LegacyShape } })
              }
              size="sm"
              width="140px"
              colorPalette={palette}
            >
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {shapeCollection.items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
          ),
        },
      ],
    },
    {
      title: "Round Icon (API = 25)",
      items: [
        {
          label: "Generate",
          control: (
            <Switch.Root
              colorPalette={palette}
              checked={config.round.generate}
              onCheckedChange={(d) =>
                update({ round: { generate: !!d.checked } })
              }
            >
              <Switch.HiddenInput />
              <Switch.Control />
            </Switch.Root>
          ),
        },
      ],
    },
    {
      title: "Google Play Store Icon",
      items: [
        {
          label: "Generate",
          control: (
            <Switch.Root
              colorPalette={palette}
              checked={config.playStore.generate}
              onCheckedChange={(d) =>
                update({ playStore: { generate: !!d.checked } })
              }
            >
              <Switch.HiddenInput />
              <Switch.Control />
            </Switch.Root>
          ),
        },
      ],
    },
    {
      title: "Icon Format",
      items: [
        {
          label: "Format",
          control: (
            <SegmentGroup.Root
              size="sm"
              colorPalette={palette}
              value={config.format}
              onValueChange={(d) => {
                if (d.value) update({ format: d.value as "png" | "webp" });
              }}
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Items items={["png", "webp"]} />
            </SegmentGroup.Root>
          ),
        },
      ],
    },
  ];

  return (
    <VStack align="stretch" gap={4} pt={2}>
      <AppIconGeneratorSettingsSection sections={sections} />
    </VStack>
  );
};

export default AppIconGeneratorAndroidOptionsTab;

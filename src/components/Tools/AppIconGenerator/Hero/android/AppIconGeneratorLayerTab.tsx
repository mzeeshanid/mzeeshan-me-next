import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Box,
  CloseButton,
  Field,
  FileUpload,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Link,
  Popover,
  SegmentGroup,
  Slider,
  Spacer,
  Spinner,
  Switch,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { LuFileUp } from "react-icons/lu";
import type {
  ClipartLayerAsset,
  BackgroundLayerConfig,
  ForegroundLayerConfig,
} from "./AppIconGeneratorAndroidTypes";
import AppIconGeneratorColorPickerControl from "./AppIconGeneratorColorPickerControl";
import AppIconGeneratorFontSelector from "./AppIconGeneratorFontSelector";
import AppIconGeneratorSettingsSection from "./AppIconGeneratorSettingsSection";
import {
  extractIconSvg,
  loadIconComponent,
  getPrefixFromIconName,
} from "./AppIconGeneratorIconUtils";

// ─── Image upload ─────────────────────────────────────────────────────────────

const ImageInput: React.FC<{
  previewUrl?: string;
  onChange: (file: File, previewUrl: string) => void;
  onRemove: () => void;
}> = ({ previewUrl, onChange, onRemove }) => (
  <HStack gap={2} align="center">
    {previewUrl && (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={previewUrl}
        alt="layer preview"
        style={{
          width: 28,
          height: 28,
          borderRadius: 4,
          objectFit: "cover",
          flexShrink: 0,
        }}
      />
    )}
    <FileUpload.Root
      accept={["image/png", "image/jpeg", "image/webp"]}
      maxW="220px"
      onFileChange={(details) => {
        if (details.acceptedFiles.length > 0) {
          const file = details.acceptedFiles[0];
          onChange(file, URL.createObjectURL(file));
        } else {
          onRemove();
        }
      }}
    >
      <FileUpload.HiddenInput />
      <InputGroup
        startElement={<LuFileUp />}
        endElement={
          <FileUpload.ClearTrigger asChild>
            <CloseButton
              me="-1"
              size="xs"
              variant="plain"
              focusVisibleRing="inside"
              focusRingWidth="2px"
              pointerEvents="auto"
            />
          </FileUpload.ClearTrigger>
        }
      >
        <Input asChild size="sm">
          <FileUpload.Trigger>
            <FileUpload.FileText lineClamp={1} />
          </FileUpload.Trigger>
        </Input>
      </InputGroup>
    </FileUpload.Root>
  </HStack>
);

// ─── Icon name field ──────────────────────────────────────────────────────────

const IconNameField: React.FC<{
  asset: ClipartLayerAsset;
  onChange: (asset: ClipartLayerAsset) => void;
}> = ({ asset, onChange }) => {
  const { palette } = useColorPalette();
  const [iconName, setIconName] = React.useState(asset.iconName || "");
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "valid" | "invalid"
  >(asset.iconName ? "valid" : "idle");
  const [guideOpen, setGuideOpen] = React.useState(false);
  const componentRef = React.useRef<React.FC<{
    size?: number;
    color?: string;
  }> | null>(null);
  const latestAssetRef = React.useRef(asset);

  React.useEffect(() => {
    latestAssetRef.current = asset;
  });

  // Load icon when name changes (debounced 350 ms)
  React.useEffect(() => {
    if (!iconName.trim()) {
      setStatus("idle");
      componentRef.current = null;
      return;
    }

    setStatus("loading");
    const timer = setTimeout(async () => {
      const component = await loadIconComponent(iconName);
      if (component) {
        componentRef.current = component;
        setStatus("valid");
        const a = latestAssetRef.current;
        const svgString = extractIconSvg(component, a.color);
        const pack = getPrefixFromIconName(iconName) ?? a.iconSet;
        onChange({ ...a, iconName, iconSet: pack, svgString });
      } else {
        componentRef.current = null;
        setStatus("invalid");
      }
    }, 800);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iconName]);

  // Re-extract SVG when color changes (component already cached)
  const prevColorRef = React.useRef(asset.color);
  React.useEffect(() => {
    if (asset.color === prevColorRef.current) return;
    prevColorRef.current = asset.color;
    if (componentRef.current && status === "valid") {
      const comp = componentRef.current;
      const color = asset.color;
      // setTimeout(0) ensures flushSync runs outside React's commit phase
      setTimeout(() => {
        const svgString = extractIconSvg(comp, color);
        onChange({ ...latestAssetRef.current, svgString });
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asset.color]);

  const isInvalid = status === "invalid" && iconName.trim().length > 0;
  const LoadedIcon = status === "valid" ? componentRef.current : null;

  return (
    <HStack gap={2} align="flex-start" w="300px">
      {/* Icon preview */}
      <Box
        w="32px"
        h="32px"
        flexShrink={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="md"
        borderWidth="1px"
        bg="bg.subtle"
        mt="1px"
      >
        {status === "loading" ? (
          <Spinner size="xs" />
        ) : LoadedIcon ? (
          <LoadedIcon size={16} color={"bg.inverted"} />
        ) : null}
      </Box>

      {/* Input + helper */}
      <Field.Root invalid={isInvalid} colorPalette={palette} flex="1" minW={0}>
        <HStack gap={1.5} w="full">
          <Input
            size="sm"
            flex="1"
            value={iconName}
            onChange={(e) => setIconName(e.target.value)}
            placeholder="e.g. FaHeart"
          />
          {/* Info button */}
          <Popover.Root
            open={guideOpen}
            onOpenChange={({ open: o }) => setGuideOpen(o)}
            positioning={{ placement: "left" }}
          >
            <Popover.Trigger asChild>
              <IconButton
                variant="subtle"
                size="xs"
                colorPalette={palette}
                aria-label="How to find the icon name"
              >
                <FaCircleInfo />
              </IconButton>
            </Popover.Trigger>
            <Popover.Positioner>
              <Popover.Content maxW="380px" p={2}>
                <Popover.Arrow />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/react_icon_name_copy_guide.png"
                  alt="How to copy the icon name from react-icons"
                  style={{ width: "100%", borderRadius: 6 }}
                />
              </Popover.Content>
            </Popover.Positioner>
          </Popover.Root>
        </HStack>

        <Field.HelperText>
          {"Exact name from "}
          <Link
            href="https://react-icons.github.io/react-icons/"
            target="_blank"
            rel="noopener noreferrer"
            color={`${palette}.fg`}
          >
            {"react-icons ↗"}
          </Link>
          {" — e.g. FaHeart, LuZap, MdHome"}
        </Field.HelperText>
        {isInvalid && (
          <Field.ErrorText>{"Icon name isn't valid"}</Field.ErrorText>
        )}
      </Field.Root>
    </HStack>
  );
};

// ─── Resize control ───────────────────────────────────────────────────────────

const ResizeControl: React.FC<{
  value: number;
  onChange: (v: number) => void;
}> = ({ value, onChange }) => {
  const { palette } = useColorPalette();
  const [raw, setRaw] = React.useState(String(value));

  React.useEffect(() => {
    setRaw(String(value));
  }, [value]);

  const commit = (s: string) => {
    const n = parseInt(s, 10);
    const clamped = isNaN(n) ? value : Math.min(400, Math.max(0, n));
    onChange(clamped);
    setRaw(String(clamped));
  };

  const parsed = parseInt(raw, 10);
  const isOutOfRange = !isNaN(parsed) && (parsed < 0 || parsed > 400);

  return (
    <VStack gap={1.5} w="180px" align="stretch">
      <Slider.Root
        size="sm"
        colorPalette={palette}
        min={0}
        max={400}
        step={1}
        value={[value]}
        onValueChange={(d) => onChange(d.value[0])}
      >
        <InputGroup w={"auto"} endAddon="%" alignSelf="flex-end">
          <Input
            size="xs"
            textAlign="right"
            maxW={10}
            value={raw}
            borderColor={isOutOfRange ? "red.500" : undefined}
            onChange={(e) => setRaw(e.target.value.replace(/[^0-9]/g, ""))}
            onBlur={() => commit(raw)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit(raw);
            }}
          />
        </InputGroup>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} />
        </Slider.Control>
      </Slider.Root>
    </VStack>
  );
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface ForegroundProps {
  mode: "foreground" | "monochrome";
  config: ForegroundLayerConfig;
  fileName: string;
  onChange: (config: ForegroundLayerConfig) => void;
  showGeneralSection?: boolean;
}

interface BackgroundProps {
  mode: "background";
  config: BackgroundLayerConfig;
  fileName: string;
  onChange: (config: BackgroundLayerConfig) => void;
  showGeneralSection?: boolean;
}

type Props = ForegroundProps | BackgroundProps;

function getLayerSuffix(layerName: string, fileName: string): string {
  const prefix = `${fileName}_`;
  return layerName.startsWith(prefix)
    ? layerName.slice(prefix.length)
    : layerName;
}

// ─── LayerTab ─────────────────────────────────────────────────────────────────

const AppIconGeneratorLayerTab: React.FC<Props> = (props) => {
  const { palette } = useColorPalette();
  const isFg = props.mode !== "background";

  const fg = isFg ? (props.config as ForegroundLayerConfig) : null;
  const bg = !isFg ? (props.config as BackgroundLayerConfig) : null;

  const fgAssetType = fg?.asset.type ?? "image";
  const bgAssetType = bg?.asset.type ?? "color";

  const prefix = `${props.fileName}_`;
  const suffix = getLayerSuffix(props.config.layerName, props.fileName);
  const suffixValid = suffix.trim().length > 0;

  const updateFg = (patch: Partial<ForegroundLayerConfig>) => {
    if (!isFg) return;
    (props as ForegroundProps).onChange({
      ...(props.config as ForegroundLayerConfig),
      ...patch,
    });
  };

  const updateBg = (patch: Partial<BackgroundLayerConfig>) => {
    if (isFg) return;
    (props as BackgroundProps).onChange({
      ...(props.config as BackgroundLayerConfig),
      ...patch,
    });
  };

  const handleSuffixChange = (newSuffix: string) => {
    const fullName = `${prefix}${newSuffix}`;
    if (isFg) updateFg({ layerName: fullName });
    else updateBg({ layerName: fullName });
  };

  // ── Source asset rows (foreground) ────────────────────────────────────────

  const fgAssetRows = React.useMemo(() => {
    if (!fg) return [];
    const asset = fg.asset;

    if (asset.type === "image") {
      return [
        {
          label: "Path",
          control: (
            <ImageInput
              previewUrl={asset.previewUrl}
              onChange={(file, previewUrl) =>
                updateFg({ asset: { type: "image", file, previewUrl } })
              }
              onRemove={() => updateFg({ asset: { type: "image" } })}
            />
          ),
        },
      ];
    }

    if (asset.type === "clipart") {
      return [
        {
          label: "Icon",
          control: (
            <IconNameField
              asset={asset}
              onChange={(updated) => updateFg({ asset: updated })}
            />
          ),
        },
        {
          label: "Color",
          control: (
            <AppIconGeneratorColorPickerControl
              value={asset.color}
              onChange={(color) => {
                // Re-extract SVG with new color (cached component → fast)
                loadIconComponent(asset.iconName).then((component) => {
                  const svgString = component
                    ? extractIconSvg(component, color)
                    : asset.svgString;
                  updateFg({ asset: { ...asset, color, svgString } });
                });
              }}
            />
          ),
        },
      ];
    }

    if (asset.type === "text") {
      return [
        {
          label: "Text",
          control: (
            <VStack align="stretch" gap={1.5} w="160px">
              <SegmentGroup.Root
                size="xs"
                colorPalette={palette}
                value={asset.fontStyle ?? "regular"}
                onValueChange={(d) => {
                  if (d.value)
                    updateFg({ asset: { ...asset, fontStyle: d.value as import("./AppIconGeneratorAndroidTypes").TextFontStyle } });
                }}
              >
                <SegmentGroup.Indicator />
                <SegmentGroup.Item value="regular" flex={1}>
                  <SegmentGroup.ItemHiddenInput />
                  <SegmentGroup.ItemText>
                    <span style={{ fontWeight: "normal", fontStyle: "normal" }}>{"R"}</span>
                  </SegmentGroup.ItemText>
                </SegmentGroup.Item>
                <SegmentGroup.Item value="bold" flex={1}>
                  <SegmentGroup.ItemHiddenInput />
                  <SegmentGroup.ItemText>
                    <span style={{ fontWeight: "bold" }}>{"B"}</span>
                  </SegmentGroup.ItemText>
                </SegmentGroup.Item>
                <SegmentGroup.Item value="italic" flex={1}>
                  <SegmentGroup.ItemHiddenInput />
                  <SegmentGroup.ItemText>
                    <span style={{ fontStyle: "italic" }}>{"I"}</span>
                  </SegmentGroup.ItemText>
                </SegmentGroup.Item>
              </SegmentGroup.Root>
              <Field.Root invalid={!asset.text.trim()} colorPalette={palette}>
                <Input
                  size="sm"
                  value={asset.text}
                  onChange={(e) =>
                    updateFg({ asset: { ...asset, text: e.target.value } })
                  }
                  placeholder="Enter text…"
                />
              </Field.Root>
            </VStack>
          ),
        },
        {
          label: "Font",
          control: (
            <AppIconGeneratorFontSelector
              value={asset.font}
              onChange={(font) => updateFg({ asset: { ...asset, font } })}
            />
          ),
        },
        {
          label: "Color",
          control: (
            <AppIconGeneratorColorPickerControl
              value={asset.color}
              onChange={(color) => updateFg({ asset: { ...asset, color } })}
            />
          ),
        },
      ];
    }

    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fg?.asset]);

  // ── Source asset rows (background) ───────────────────────────────────────

  const bgAssetRows = React.useMemo(() => {
    if (!bg) return [];
    const asset = bg.asset;

    if (asset.type === "color") {
      return [
        {
          label: "Color",
          control: (
            <AppIconGeneratorColorPickerControl
              value={asset.color}
              onChange={(color) =>
                updateBg({ asset: { type: "color", color } })
              }
            />
          ),
        },
      ];
    }

    if (asset.type === "image") {
      return [
        {
          label: "Path",
          control: (
            <ImageInput
              previewUrl={asset.previewUrl}
              onChange={(file, previewUrl) =>
                updateBg({ asset: { type: "image", file, previewUrl } })
              }
              onRemove={() => updateBg({ asset: { type: "image" } })}
            />
          ),
        },
      ];
    }

    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bg?.asset]);

  // ── Sections ──────────────────────────────────────────────────────────────

  const sections = [
    ...(props.showGeneralSection !== false ? [{
      title: "General",
      items: [
        {
          label: "Layer name",
          control: (
            <Field.Root invalid={!suffixValid} colorPalette={palette}>
              <InputGroup startAddon={prefix}>
                <Input
                  size="sm"
                  value={suffix}
                  minW="80px"
                  maxW="140px"
                  onChange={(e) => handleSuffixChange(e.target.value)}
                  placeholder={
                    props.mode === "foreground"
                      ? "foreground"
                      : props.mode === "background"
                        ? "background"
                        : "monochrome"
                  }
                />
              </InputGroup>
              <Field.HelperText>
                {"Name: "}
                <Box as="span" fontWeight="bold">
                  {props.config.layerName || "(empty)"}
                </Box>
              </Field.HelperText>
            </Field.Root>
          ),
        },
      ],
      footer: "To change the prefix, update the File name above.",
    }] : []),
    {
      title: "Source Asset",
      items: [
        {
          label: "Asset Type",
          control: isFg ? (
            <SegmentGroup.Root
              size="sm"
              colorPalette={palette}
              value={fgAssetType}
              onValueChange={(d) => {
                if (!d.value) return;
                if (d.value === "image") updateFg({ asset: { type: "image" } });
                else if (d.value === "clipart")
                  updateFg({
                    asset: {
                      type: "clipart",
                      iconName: "",
                      iconSet: "",
                      color: "#000000",
                    },
                  });
                else if (d.value === "text")
                  updateFg({
                    asset: {
                      type: "text",
                      text: "",
                      font: "System Default",
                      color: "#000000",
                      fontStyle: "regular",
                    },
                  });
              }}
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Items
                items={[
                  { value: "image", label: "Image" },
                  { value: "clipart", label: "Clip art" },
                  { value: "text", label: "Text" },
                ]}
              />
            </SegmentGroup.Root>
          ) : (
            <SegmentGroup.Root
              size="sm"
              colorPalette={palette}
              value={bgAssetType}
              onValueChange={(d) => {
                if (!d.value) return;
                if (d.value === "color")
                  updateBg({ asset: { type: "color", color: "#3DDC84" } });
                else updateBg({ asset: { type: "image" } });
              }}
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Items
                items={[
                  { value: "color", label: "Color" },
                  { value: "image", label: "Image" },
                ]}
              />
            </SegmentGroup.Root>
          ),
        },
        ...(isFg ? fgAssetRows : bgAssetRows),
      ],
    },
    ...(isFg
      ? [
          {
            title: "Scaling",
            items: [
              {
                label: "Trim",
                sublabel: fg?.trim
                  ? "Remove transparent space around the source asset"
                  : "Leave the original asset unmodified",
                control: (
                  <Switch.Root
                    colorPalette={palette}
                    checked={fg?.trim ?? false}
                    onCheckedChange={(d) => updateFg({ trim: !!d.checked })}
                  >
                    <Switch.HiddenInput />
                    <Switch.Control />
                  </Switch.Root>
                ),
              },
              {
                label: "Resize",
                control: (
                  <ResizeControl
                    value={fg?.resize ?? 100}
                    onChange={(v) => updateFg({ resize: v })}
                  />
                ),
              },
            ],
          },
        ]
      : []),
  ];

  return (
    <VStack align="stretch" gap={4} pt={2}>
      <AppIconGeneratorSettingsSection sections={sections} />
    </VStack>
  );
};

export default AppIconGeneratorLayerTab;

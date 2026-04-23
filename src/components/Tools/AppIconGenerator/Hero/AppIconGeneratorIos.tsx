import { Toaster, toaster } from "@/components/ui/toaster";
import type {
  AppIconPlatformKey,
  AppIconPlatformSelection,
} from "@/components/Tools/AppIconGenerator/appIconGeneratorTypes";
import { appIconGeneratorPlatformCardData } from "@/data/tools/appIconGenerator/appIconGeneratorData";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Box,
  Button,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Switch,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaApple, FaArrowRotateLeft } from "react-icons/fa6";
import AppIconGenerateButton from "./AppIconGeneratorGenerateButton";
import AppIconPlatformOptions from "./AppIconGeneratorPlatformOptions";
import AppIconGeneratorLayerTab from "./android/AppIconGeneratorLayerTab";
import AppIconGeneratorSettingsSection from "./android/AppIconGeneratorSettingsSection";
import AppIconGeneratorIosPreviewPanel from "./ios/AppIconGeneratorIosPreviewPanel";
import { DEFAULT_IOS_LAYER_CONFIG } from "./ios/AppIconGeneratorIosTypes";
import type { IosLayerConfig } from "./ios/AppIconGeneratorIosTypes";
import {
  generateAndDownloadIosIcons,
  renderToCanvas,
} from "./ios/AppIconGeneratorIosGenerationService";

const INITIAL_IOS_SELECTION: AppIconPlatformSelection = {
  iphone: true,
  ipad: false,
  watchos: false,
  macos: false,
  android: false,
};

const mkDefault = (): IosLayerConfig => ({
  foreground: { ...DEFAULT_IOS_LAYER_CONFIG.foreground },
  background: { ...DEFAULT_IOS_LAYER_CONFIG.background },
});

type Props = {
  onIconPreviewChange?: (url: string | undefined) => void;
  onGenerateArchive?: unknown;
  resolveImageDimensions?: unknown;
  onImageChange?: unknown;
};

const AppIconGeneratorIos: React.FC<Props> = ({ onIconPreviewChange }) => {
  const { palette } = useColorPalette();

  // ── Platform selection ─────────────────────────────────────────────────────
  const [selection, setSelection] = React.useState<AppIconPlatformSelection>(
    INITIAL_IOS_SELECTION,
  );

  // ── Preview options ────────────────────────────────────────────────────────
  const [showSafeZone, setShowSafeZone] = React.useState(true);
  const [showGrid, setShowGrid] = React.useState(false);

  // ── Appearance switches ────────────────────────────────────────────────────
  const [darkEnabled,   setDarkEnabled]   = React.useState(true);
  const [tintedEnabled, setTintedEnabled] = React.useState(true);

  // ── Per-appearance layer configs ───────────────────────────────────────────
  const [anyConfig,    setAnyConfig]    = React.useState<IosLayerConfig>(mkDefault());
  const [darkConfig,   setDarkConfig]   = React.useState<IosLayerConfig>(mkDefault());
  const [tintedConfig, setTintedConfig] = React.useState<IosLayerConfig>(mkDefault());

  // ── Active appearance tab ──────────────────────────────────────────────────
  const [activeVariant, setActiveVariant] = React.useState<"any" | "dark" | "tinted">("any");

  // ── Active layer tab (Background / Foreground) ─────────────────────────────
  const [layerTab, setLayerTab] = React.useState("background");

  // ── Generate state ─────────────────────────────────────────────────────────
  const [isGenerating, setIsGenerating] = React.useState(false);

  const iosKeys: AppIconPlatformKey[] =
    appIconGeneratorPlatformCardData.apple.items.map(
      (i) => i.key as AppIconPlatformKey,
    );
  const platformCount = iosKeys.filter((k) => selection[k]).length;
  const isGenerateDisabled = platformCount === 0;

  // ── Live preview for device mockups ────────────────────────────────────────
  const previewConfig =
    activeVariant === "dark"   && darkEnabled   ? darkConfig :
    activeVariant === "tinted" && tintedEnabled ? tintedConfig :
    anyConfig;

  React.useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const canvas = await renderToCanvas(previewConfig);
        if (!cancelled) onIconPreviewChange?.(canvas.toDataURL("image/png"));
      } catch {
        if (!cancelled) onIconPreviewChange?.(undefined);
      }
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [previewConfig, onIconPreviewChange]);

  // ── Reset ──────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setSelection(INITIAL_IOS_SELECTION);
    setShowSafeZone(true);
    setShowGrid(false);
    setDarkEnabled(true);
    setTintedEnabled(true);
    setAnyConfig(mkDefault());
    setDarkConfig(mkDefault());
    setTintedConfig(mkDefault());
    setActiveVariant("any");
    setLayerTab("background");
  };

  // ── Generate ───────────────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (isGenerateDisabled) return;
    try {
      setIsGenerating(true);
      const result = await generateAndDownloadIosIcons(
        {
          darkEnabled,
          tintedEnabled,
          any:    anyConfig,
          dark:   darkEnabled   ? darkConfig   : undefined,
          tinted: tintedEnabled ? tintedConfig : undefined,
        },
        selection,
      );
      toaster.success({
        title: "iOS icon pack ready",
        description: `${result.filename} downloaded.`,
        closable: true,
      });
    } catch {
      toaster.error({
        title: "Generation failed",
        description: "Could not generate the icon archive. Try again.",
        closable: true,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // ── Layer tab renderer (shared across appearances) ─────────────────────────
  const renderLayerTabs = (
    config: IosLayerConfig,
    setConfig: React.Dispatch<React.SetStateAction<IosLayerConfig>>,
    key: string,
  ) => (
    <Tabs.Root
      key={key}
      value={layerTab}
      onValueChange={(d) => setLayerTab(d.value)}
      variant="line"
      colorPalette={palette}
    >
      <Tabs.List>
        <Tabs.Trigger value="background">{"Background"}</Tabs.Trigger>
        <Tabs.Trigger value="foreground">{"Foreground"}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="background">
        <AppIconGeneratorLayerTab
          mode="background"
          config={config.background}
          fileName="ios_icon"
          showGeneralSection={false}
          onChange={(background) =>
            setConfig((prev) => ({ ...prev, background }))
          }
        />
      </Tabs.Content>

      <Tabs.Content value="foreground">
        <AppIconGeneratorLayerTab
          mode="foreground"
          config={config.foreground}
          fileName="ios_icon"
          showGeneralSection={false}
          onChange={(foreground) =>
            setConfig((prev) => ({ ...prev, foreground }))
          }
        />
      </Tabs.Content>
    </Tabs.Root>
  );

  // ── Output info ────────────────────────────────────────────────────────────
  const variantCount = 1 + (darkEnabled ? 1 : 0) + (tintedEnabled ? 1 : 0);
  const variantNames = [
    "Any",
    ...(darkEnabled   ? ["Dark"]   : []),
    ...(tintedEnabled ? ["Tinted"] : []),
  ];

  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      p={{ base: 4, md: 6 }}
      bg="bg.panel"
    >
      <Toaster />

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <HStack justify="space-between" mb={6}>
        <HStack gap={2}>
          <Icon as={FaApple} />
          <Text fontWeight="bold" fontSize="md">
            {"iOS and macOS"}
          </Text>
        </HStack>
        <Button
          size="xs"
          variant="ghost"
          colorPalette="red"
          onClick={handleReset}
          aria-label="Reset"
        >
          <Icon as={FaArrowRotateLeft} />
          {"Reset"}
        </Button>
      </HStack>

      {/* ── 2-column layout: preview | controls ─────────────────────────────── */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 6, lg: 8 }}>
        {/* ── Left: live preview ─────────────────────────────────────────────── */}
        <GridItem>
          <Box
            borderWidth="1px"
            borderRadius="xl"
            p={4}
            bg="bg.subtle"
            position="sticky"
            top="80px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            minH="220px"
          >
            <AppIconGeneratorIosPreviewPanel
              config={previewConfig}
              showSafeZone={showSafeZone}
              showGrid={showGrid}
            />
          </Box>
        </GridItem>

        {/* ── Right: controls ───────────────────────────────────────────────── */}
        <GridItem>
          <VStack align="stretch" gap={5}>
            {/* Platform selection */}
            <AppIconPlatformOptions
              selection={selection}
              onPlatformChange={(key, checked) =>
                setSelection((cur) => ({ ...cur, [key]: checked }))
              }
            />

            {/* Safe zone / grid toggles */}
            <AppIconGeneratorSettingsSection
              sections={[
                {
                  items: [
                    {
                      label: "Show safe zone",
                      control: (
                        <Switch.Root
                          colorPalette={palette}
                          checked={showSafeZone}
                          onCheckedChange={(d) => setShowSafeZone(!!d.checked)}
                        >
                          <Switch.HiddenInput />
                          <Switch.Control />
                        </Switch.Root>
                      ),
                    },
                    {
                      label: "Show grid",
                      control: (
                        <Switch.Root
                          colorPalette={palette}
                          checked={showGrid}
                          onCheckedChange={(d) => setShowGrid(!!d.checked)}
                        >
                          <Switch.HiddenInput />
                          <Switch.Control />
                        </Switch.Root>
                      ),
                    },
                  ],
                },
              ]}
            />

            {/* Appearances section */}
            <AppIconGeneratorSettingsSection
              sections={[
                {
                  title: "Appearances",
                  items: [
                    {
                      label: "Dark Appearance",
                      control: (
                        <Switch.Root
                          colorPalette={palette}
                          checked={darkEnabled}
                          onCheckedChange={(d) => {
                            setDarkEnabled(!!d.checked);
                            if (!d.checked && activeVariant === "dark")
                              setActiveVariant("any");
                          }}
                        >
                          <Switch.HiddenInput />
                          <Switch.Control />
                        </Switch.Root>
                      ),
                    },
                    {
                      label: "Tinted Appearance",
                      control: (
                        <Switch.Root
                          colorPalette={palette}
                          checked={tintedEnabled}
                          onCheckedChange={(d) => {
                            setTintedEnabled(!!d.checked);
                            if (!d.checked && activeVariant === "tinted")
                              setActiveVariant("any");
                          }}
                        >
                          <Switch.HiddenInput />
                          <Switch.Control />
                        </Switch.Root>
                      ),
                    },
                  ],
                },
              ]}
            />

            {/* Appearance tabs — Any always visible, Dark/Tinted conditional */}
            <Tabs.Root
              value={activeVariant}
              onValueChange={(d) =>
                setActiveVariant(d.value as typeof activeVariant)
              }
              variant="enclosed"
              colorPalette={palette}
            >
              <Tabs.List w="full">
                <Tabs.Trigger value="any" flex="1">
                  {"Any"}
                </Tabs.Trigger>
                {darkEnabled && (
                  <Tabs.Trigger value="dark" flex="1">
                    {"Dark"}
                  </Tabs.Trigger>
                )}
                {tintedEnabled && (
                  <Tabs.Trigger value="tinted" flex="1">
                    {"Tinted"}
                  </Tabs.Trigger>
                )}
              </Tabs.List>

              <Tabs.Content value="any">
                {renderLayerTabs(anyConfig, setAnyConfig, "any")}
              </Tabs.Content>

              {darkEnabled && (
                <Tabs.Content value="dark">
                  {renderLayerTabs(darkConfig, setDarkConfig, "dark")}
                </Tabs.Content>
              )}

              {tintedEnabled && (
                <Tabs.Content value="tinted">
                  {renderLayerTabs(tintedConfig, setTintedConfig, "tinted")}
                </Tabs.Content>
              )}
            </Tabs.Root>

            {/* Output info */}
            <Text fontSize="xs" color="fg.muted">
              {`Output: Sizes folder (all selected sizes) + iOS 26+ folder (${variantCount} icon${variantCount > 1 ? "s" : ""}: ${variantNames.join(", ")} at 1024 × 1024).`}
            </Text>

            <AppIconGenerateButton
              disabled={isGenerateDisabled}
              loading={isGenerating}
              onClick={handleGenerate}
            />
          </VStack>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default AppIconGeneratorIos;

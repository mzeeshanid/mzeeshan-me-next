import { Toaster, toaster } from "@/components/ui/toaster";
import { useColorPalette } from "@/contexts/useColorPalette";
import { isAndroidFileNameValid } from "@/services/appIconGenerator";
import {
  Box,
  Button,
  GridItem,
  HStack,
  Icon,
  Input,
  NativeSelect,
  SimpleGrid,
  Spinner,
  Switch,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaAndroid, FaArrowRotateLeft } from "react-icons/fa6";
import { DEFAULT_ANDROID_CONFIG } from "./android/AppIconGeneratorAndroidTypes";
import type { AndroidIconConfig } from "./android/AppIconGeneratorAndroidTypes";
import {
  generateAndDownloadAndroidIcons,
  renderAndroidPreviewDataUrl,
} from "./android/AppIconGeneratorAndroidGenerationService";
import AndroidOptionsTab from "./android/AppIconGeneratorAndroidOptionsTab";
import AppIconGeneratorAndroidPreviewPanel from "./android/AppIconGeneratorAndroidPreviewPanel";
import AppIconGeneratorLayerTab from "./android/AppIconGeneratorLayerTab";
import AppIconGeneratorSettingsSection from "./android/AppIconGeneratorSettingsSection";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLayerSuffix(layerName: string, fileName: string): string {
  const prefix = `${fileName}_`;
  return layerName.startsWith(prefix) ? layerName.slice(prefix.length) : layerName;
}

// ─── Component ────────────────────────────────────────────────────────────────

type Props = {
  onIconPreviewChange?: (url: string | undefined) => void;
};

const AppIconGeneratorAndroid: React.FC<Props> = ({ onIconPreviewChange }) => {
  const { palette } = useColorPalette();
  const [config, setConfig] = React.useState<AndroidIconConfig>(DEFAULT_ANDROID_CONFIG);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("foreground");

  // Preview options (left panel)
  const [previewDensity, setPreviewDensity] = React.useState("xhdpi");
  const [showSafeZone, setShowSafeZone] = React.useState(true);
  const [showGrid, setShowGrid] = React.useState(false);

  // ── Live preview for device mockups ────────────────────────────────────────
  React.useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const dataUrl = await renderAndroidPreviewDataUrl(config);
        if (!cancelled) onIconPreviewChange?.(dataUrl);
      } catch {
        if (!cancelled) onIconPreviewChange?.(undefined);
      }
    }, 300);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [config, onIconPreviewChange]);

  const handleReset = () => {
    setConfig(DEFAULT_ANDROID_CONFIG);
    setActiveTab("foreground");
    setPreviewDensity("xhdpi");
    setShowSafeZone(true);
    setShowGrid(false);
  };

  const fileNameValid = isAndroidFileNameValid(config.fileName);

  const isGenerateDisabled =
    !fileNameValid ||
    !config.foreground.layerName.trim() ||
    !config.background.layerName.trim();

  // Update fileName and keep layer name suffixes in sync
  const handleFileNameChange = (newFileName: string) => {
    const fgSuffix = getLayerSuffix(config.foreground.layerName, config.fileName) || "foreground";
    const bgSuffix = getLayerSuffix(config.background.layerName, config.fileName) || "background";
    const monoSuffix = getLayerSuffix(config.monochrome.layerName, config.fileName) || "monochrome";
    setConfig((c) => ({
      ...c,
      fileName: newFileName,
      foreground: { ...c.foreground, layerName: `${newFileName}_${fgSuffix}` },
      background: { ...c.background, layerName: `${newFileName}_${bgSuffix}` },
      monochrome: { ...c.monochrome, layerName: `${newFileName}_${monoSuffix}` },
    }));
  };

  const handleGenerate = async () => {
    if (isGenerateDisabled) return;
    try {
      setIsGenerating(true);
      const result = await generateAndDownloadAndroidIcons(config);
      toaster.success({
        title: "Android icon pack ready",
        description: `${result.filename} downloaded.`,
        closable: true,
      });
    } catch {
      toaster.error({
        title: "Generation failed",
        description: "Could not generate the Android icon archive. Try again.",
        closable: true,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box>
      <Toaster />
      <Box borderWidth="1px" borderRadius="2xl" p={{ base: 4, md: 6 }} bg="bg.panel">
        {/* ── Heading ─────────────────────────────────────────────────────── */}
        <HStack justify="space-between" mb={6}>
          <HStack gap={2}>
            <Icon as={FaAndroid} />
            <Text fontWeight="bold" fontSize="md">{"Android"}</Text>
          </HStack>
          <Button
            size="xs"
            variant="ghost"
            colorPalette="red"
            onClick={handleReset}
            aria-label="Reset to defaults"
          >
            <Icon as={FaArrowRotateLeft} />
            {"Reset"}
          </Button>
        </HStack>

        {/* ── Two-column layout ────────────────────────────────────────────── */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 6, lg: 8 }}>
          {/* ── LEFT: Live preview ──────────────────────────────────────── */}
          <GridItem>
            <Box
              borderWidth="1px"
              borderRadius="xl"
              p={4}
              bg="bg.subtle"
              position="sticky"
              top="80px"
            >
              <AppIconGeneratorAndroidPreviewPanel
                config={config}
                previewDensity={previewDensity}
                showSafeZone={showSafeZone}
                showGrid={showGrid}
              />
            </Box>
          </GridItem>

          {/* ── RIGHT: Settings + Tabs ──────────────────────────────────── */}
          <GridItem>
            {/* File name + preview options as settings rows */}
            <AppIconGeneratorSettingsSection
              sections={[
                {
                  items: [
                    {
                      label: "File name",
                      sublabel: !fileNameValid
                        ? "Use lowercase letters, numbers, and underscores. Start with a letter."
                        : undefined,
                      control: (
                        <Input
                          size="sm"
                          value={config.fileName}
                          maxW="200px"
                          maxLength={20}
                          placeholder="ic_launcher"
                          colorPalette={palette}
                          borderColor={!fileNameValid ? "red.500" : undefined}
                          onChange={(e) => handleFileNameChange(e.target.value)}
                          data-testid="android-file-name-input"
                        />
                      ),
                    },
                    {
                      label: "Preview",
                      control: (
                        <NativeSelect.Root size="sm" w="130px" colorPalette={palette}>
                          <NativeSelect.Field
                            value={previewDensity}
                            onChange={(e) => setPreviewDensity(e.target.value)}
                          >
                            <option value="mdpi">{"mdpi (0.5×)"}</option>
                            <option value="hdpi">{"hdpi (0.75×)"}</option>
                            <option value="xhdpi">{"xhdpi (1×)"}</option>
                            <option value="xxhdpi">{"xxhdpi (1.5×)"}</option>
                            <option value="xxxhdpi">{"xxxhdpi (2×)"}</option>
                          </NativeSelect.Field>
                          <NativeSelect.Indicator />
                        </NativeSelect.Root>
                      ),
                    },
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

            {/* Tabs */}
            <Box mt={5}>
              <Tabs.Root
                value={activeTab}
                onValueChange={(d) => setActiveTab(d.value)}
                variant="line"
                colorPalette={palette}
              >
                <Tabs.List>
                  <Tabs.Trigger value="foreground">{"Foreground"}</Tabs.Trigger>
                  <Tabs.Trigger value="background">{"Background"}</Tabs.Trigger>
                  <Tabs.Trigger value="monochrome">{"Monochrome"}</Tabs.Trigger>
                  <Tabs.Trigger value="options">{"Options"}</Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="foreground">
                  <AppIconGeneratorLayerTab
                    mode="foreground"
                    config={config.foreground}
                    fileName={config.fileName}
                    onChange={(foreground) => setConfig((c) => ({ ...c, foreground }))}
                  />
                </Tabs.Content>

                <Tabs.Content value="background">
                  <AppIconGeneratorLayerTab
                    mode="background"
                    config={config.background}
                    fileName={config.fileName}
                    onChange={(background) => setConfig((c) => ({ ...c, background }))}
                  />
                </Tabs.Content>

                <Tabs.Content value="monochrome">
                  <AppIconGeneratorLayerTab
                    mode="monochrome"
                    config={config.monochrome}
                    fileName={config.fileName}
                    onChange={(monochrome) => setConfig((c) => ({ ...c, monochrome }))}
                  />
                </Tabs.Content>

                <Tabs.Content value="options">
                  <AndroidOptionsTab
                    config={config.options}
                    onChange={(options) => setConfig((c) => ({ ...c, options }))}
                  />
                </Tabs.Content>
              </Tabs.Root>
            </Box>

            {/* Generate button */}
            <Box mt={6}>
              <Button
                colorPalette={palette}
                w="full"
                disabled={isGenerateDisabled}
                loading={isGenerating}
                loadingText="Generating…"
                onClick={handleGenerate}
              >
                <FaAndroid />
                {"Generate Android Icons"}
              </Button>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default AppIconGeneratorAndroid;

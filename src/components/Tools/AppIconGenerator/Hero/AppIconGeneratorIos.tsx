import { Toaster, toaster } from "@/components/ui/toaster";
import type {
  AppIconPlatformKey,
  AppIconPlatformSelection,
  UploadedImage,
} from "@/components/Tools/AppIconGenerator/appIconGeneratorTypes";
import { appIconGeneratorPlatformCardData } from "@/data/tools/appIconGenerator/appIconGeneratorData";
import { generateAndDownloadAppIconArchive } from "@/services/appIconGenerator";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Box,
  Button,
  GridItem,
  HStack,
  Icon,
  SegmentGroup,
  SimpleGrid,
  Switch,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaApple, FaArrowRotateLeft } from "react-icons/fa6";
import AppIconGenerateButton from "./AppIconGeneratorGenerateButton";
import AppIconImageUpload from "./AppIconGeneratorImageUpload";
import type { ResolveImageDimensionsFn } from "./AppIconGeneratorImageUpload";
import AppIconPlatformOptions from "./AppIconGeneratorPlatformOptions";
import AppIconGeneratorLayerTab from "./android/AppIconGeneratorLayerTab";
import AppIconGeneratorSettingsSection from "./android/AppIconGeneratorSettingsSection";
import AppIconGeneratorIosPreviewPanel from "./ios/AppIconGeneratorIosPreviewPanel";
import { DEFAULT_IOS_CUSTOM_CONFIG } from "./ios/AppIconGeneratorIosTypes";
import type { IosCustomConfig } from "./ios/AppIconGeneratorIosTypes";
import {
  generateAndDownloadIosCustomIcons,
  renderToCanvas,
} from "./ios/AppIconGeneratorIosGenerationService";

const INITIAL_IOS_SELECTION: AppIconPlatformSelection = {
  iphone: false,
  ipad: false,
  watchos: false,
  macos: false,
  android: false,
};

type Props = {
  resolveImageDimensions?: ResolveImageDimensionsFn;
  onGenerateArchive?: typeof generateAndDownloadAppIconArchive;
  onImageChange?: (image: UploadedImage | null) => void;
  onIconPreviewChange?: (url: string | undefined) => void;
};

const AppIconGeneratorIos: React.FC<Props> = ({
  resolveImageDimensions,
  onGenerateArchive = generateAndDownloadAppIconArchive,
  onImageChange,
  onIconPreviewChange,
}) => {
  const { palette } = useColorPalette();

  // ── Mode ───────────────────────────────────────────────────────────────────
  const [mode, setMode] = React.useState<"image" | "custom">("image");

  // ── Image mode state ───────────────────────────────────────────────────────
  const [image, setImage] = React.useState<UploadedImage | null>(null);
  const [imageError, setImageError] = React.useState<string | null>(null);
  const [imageWarning, setImageWarning] = React.useState<string | null>(null);

  // ── Custom mode state ──────────────────────────────────────────────────────
  const [customConfig, setCustomConfig] = React.useState<IosCustomConfig>(
    DEFAULT_IOS_CUSTOM_CONFIG,
  );
  const [showSafeZone, setShowSafeZone] = React.useState(true);
  const [showGrid, setShowGrid] = React.useState(false);
  const [customTab, setCustomTab] = React.useState("foreground");

  // ── Shared state ───────────────────────────────────────────────────────────
  const [selection, setSelection] = React.useState<AppIconPlatformSelection>(
    INITIAL_IOS_SELECTION,
  );
  const [isGenerating, setIsGenerating] = React.useState(false);

  const iosKeys: AppIconPlatformKey[] =
    appIconGeneratorPlatformCardData.apple.items.map(
      (i) => i.key as AppIconPlatformKey,
    );
  const platformCount = iosKeys.filter((k) => selection[k]).length;

  const isGenerateDisabled =
    mode === "image" ? !image || platformCount === 0 : platformCount === 0;

  // ── Live preview for device mockups ────────────────────────────────────────
  React.useEffect(() => {
    if (mode === "image") {
      onIconPreviewChange?.(image?.previewUrl);
      return;
    }
    // custom mode — debounce canvas render
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const canvas = await renderToCanvas(customConfig);
        if (!cancelled) onIconPreviewChange?.(canvas.toDataURL("image/png"));
      } catch {
        if (!cancelled) onIconPreviewChange?.(undefined);
      }
    }, 300);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [mode, image, customConfig, onIconPreviewChange]);

  // ── Reset ──────────────────────────────────────────────────────────────────
  const handleReset = () => {
    if (image?.previewUrl) URL.revokeObjectURL(image.previewUrl);
    setMode("image");
    setImage(null);
    setImageError(null);
    setImageWarning(null);
    setCustomConfig(DEFAULT_IOS_CUSTOM_CONFIG);
    setShowSafeZone(true);
    setShowGrid(false);
    setCustomTab("foreground");
    setSelection(INITIAL_IOS_SELECTION);
  };

  // ── Image handlers ─────────────────────────────────────────────────────────
  const handleImageAccepted = (nextImage: UploadedImage) => {
    if (image?.previewUrl) URL.revokeObjectURL(image.previewUrl);
    setImage(nextImage);
    setImageError(null);
    setImageWarning(
      nextImage.width === 1024 && nextImage.height === 1024
        ? null
        : "This image is not 1024 × 1024. The result may be softer on larger sizes.",
    );
    onImageChange?.(nextImage);
  };

  const handleImageRemoved = () => {
    if (image?.previewUrl) URL.revokeObjectURL(image.previewUrl);
    setImage(null);
    setImageError(null);
    setImageWarning(null);
    onImageChange?.(null);
  };

  React.useEffect(() => {
    return () => {
      if (image?.previewUrl) URL.revokeObjectURL(image.previewUrl);
    };
  }, [image]);

  // ── Generate ───────────────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (isGenerateDisabled) return;
    try {
      setIsGenerating(true);
      let result: { filename: string };

      if (mode === "image") {
        if (!image) return;
        result = await onGenerateArchive({
          imageFile: image.file,
          selection: { ...selection, android: false },
          androidFileName: "",
        });
        handleImageRemoved();
      } else {
        result = await generateAndDownloadIosCustomIcons(
          customConfig,
          selection,
          onGenerateArchive,
        );
      }

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

  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      p={{ base: 4, md: 6 }}
      bg="bg.panel"
    >
      <Toaster />

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <HStack justify="space-between" mb={6}>
        <HStack gap={2}>
          <Icon as={FaApple} />
          <Text fontWeight="bold" fontSize="md">{"iOS and macOS"}</Text>
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

      {/* ── Image mode ─────────────────────────────────────────────────────── */}
      {mode === "image" && (
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 6, lg: 8 }}>
          <GridItem>
            <AppIconImageUpload
              image={image}
              error={imageError}
              warning={imageWarning}
              onImageAccepted={handleImageAccepted}
              onImageRemoved={handleImageRemoved}
              onValidationMessage={setImageError}
              resolveImageDimensions={resolveImageDimensions}
            />
          </GridItem>
          <GridItem>
            <VStack align="stretch" gap={4}>
              <AppIconPlatformOptions
                selection={selection}
                onPlatformChange={(key, checked) =>
                  setSelection((cur) => ({ ...cur, [key]: checked }))
                }
              />
              <SegmentGroup.Root
                w="full"
                size="md"
                value={mode}
                onValueChange={(d) => {
                  if (d.value) setMode(d.value as "image" | "custom");
                }}
              >
                <SegmentGroup.Indicator />
                <SegmentGroup.Item
                  value="image"
                  flex="1"
                  justifyContent="center"
                >
                  <SegmentGroup.ItemText>{"Image"}</SegmentGroup.ItemText>
                  <SegmentGroup.ItemHiddenInput />
                </SegmentGroup.Item>
                <SegmentGroup.Item
                  value="custom"
                  flex="1"
                  justifyContent="center"
                >
                  <SegmentGroup.ItemText>{"Custom"}</SegmentGroup.ItemText>
                  <SegmentGroup.ItemHiddenInput />
                </SegmentGroup.Item>
              </SegmentGroup.Root>
              <AppIconGenerateButton
                disabled={isGenerateDisabled}
                loading={isGenerating}
                onClick={handleGenerate}
              />
            </VStack>
          </GridItem>
        </SimpleGrid>
      )}

      {/* ── Custom mode ────────────────────────────────────────────────────── */}
      {mode === "custom" && (
        <>
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 6, lg: 8 }}>
            {/* Left: live preview */}
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
              >
                <AppIconGeneratorIosPreviewPanel
                  config={customConfig}
                  showSafeZone={showSafeZone}
                  showGrid={showGrid}
                />
              </Box>
            </GridItem>

            {/* Right: controls */}
            <GridItem>
              <VStack align="stretch" gap={5}>
                {/* Platform selection */}
                <AppIconPlatformOptions
                  selection={selection}
                  onPlatformChange={(key, checked) =>
                    setSelection((cur) => ({ ...cur, [key]: checked }))
                  }
                />
                <SegmentGroup.Root
                  w="full"
                  size="md"
                  colorPalette="blue"
                  value={mode}
                  onValueChange={(d) => {
                    if (d.value) setMode(d.value as "image" | "custom");
                  }}
                >
                  <SegmentGroup.Indicator />
                  <SegmentGroup.Item
                    value="image"
                    flex="1"
                    justifyContent="center"
                  >
                    <SegmentGroup.ItemText>{"Image"}</SegmentGroup.ItemText>
                    <SegmentGroup.ItemHiddenInput />
                  </SegmentGroup.Item>
                  <SegmentGroup.Item
                    value="custom"
                    flex="1"
                    justifyContent="center"
                  >
                    <SegmentGroup.ItemText>{"Custom"}</SegmentGroup.ItemText>
                    <SegmentGroup.ItemHiddenInput />
                  </SegmentGroup.Item>
                </SegmentGroup.Root>

                {/* Preview options */}
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
                              onCheckedChange={(d) =>
                                setShowSafeZone(!!d.checked)
                              }
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

                {/* Foreground / Background tabs */}
                <Tabs.Root
                  value={customTab}
                  onValueChange={(d) => setCustomTab(d.value)}
                  variant="line"
                  colorPalette={palette}
                >
                  <Tabs.List>
                    <Tabs.Trigger value="foreground">
                      {"Foreground"}
                    </Tabs.Trigger>
                    <Tabs.Trigger value="background">
                      {"Background"}
                    </Tabs.Trigger>
                  </Tabs.List>

                  <Tabs.Content value="foreground">
                    <AppIconGeneratorLayerTab
                      mode="foreground"
                      config={customConfig.foreground}
                      fileName="ios_icon"
                      showGeneralSection={false}
                      onChange={(foreground) =>
                        setCustomConfig((c) => ({ ...c, foreground }))
                      }
                    />
                  </Tabs.Content>

                  <Tabs.Content value="background">
                    <AppIconGeneratorLayerTab
                      mode="background"
                      config={customConfig.background}
                      fileName="ios_icon"
                      showGeneralSection={false}
                      onChange={(background) =>
                        setCustomConfig((c) => ({ ...c, background }))
                      }
                    />
                  </Tabs.Content>
                </Tabs.Root>

                <AppIconGenerateButton
                  disabled={isGenerateDisabled}
                  loading={isGenerating}
                  onClick={handleGenerate}
                />
              </VStack>
            </GridItem>
          </SimpleGrid>
        </>
      )}
    </Box>
  );
};

export default AppIconGeneratorIos;

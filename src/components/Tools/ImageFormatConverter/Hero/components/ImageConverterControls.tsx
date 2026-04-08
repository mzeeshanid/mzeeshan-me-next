import {
  Checkbox,
  Field,
  GridItem,
  HStack,
  Input,
  NativeSelect,
  SegmentGroup,
  SimpleGrid,
  Slider,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { checkBrowserSupportsFormat } from "@/data/tools/imageFormatConverter/imageConversionRoutes";
import { imageFormatOptions } from "@/data/tools/imageFormatConverter/imageConversionRoutes";
import { getTargetFormatSizeNote } from "../helpers/imageConverterHelpers";
import type { HeroContent } from "@/data/tools/imageFormatConverter/types";
import { useColorPalette } from "@/contexts/useColorPalette";

type ResizeMode = "width" | "height";

interface ImageConverterControlsProps {
  sourceFormat: string;
  targetFormat: string;
  content: HeroContent;
  onSourceFormatChange: (format: string) => void;
  onTargetFormatChange: (format: string) => void;
  sameFormatMessage?: string;
}

export const ImageConverterControls: React.FC<ImageConverterControlsProps> = ({
  sourceFormat,
  targetFormat,
  content,
  onSourceFormatChange,
  onTargetFormatChange,
  sameFormatMessage,
}) => {
  const { palette } = useColorPalette();
  const browserSupportsTarget = checkBrowserSupportsFormat(targetFormat as any);
  const showBrowserWarning = targetFormat && !browserSupportsTarget;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
      <Field.Root colorPalette={palette}>
        <Field.Label>{content.selectSourceLabel}</Field.Label>
        <NativeSelect.Root>
          <NativeSelect.Field
            value={sourceFormat}
            onChange={(event) =>
              onSourceFormatChange(event.currentTarget.value)
            }
          >
            <option value="">{content.selectPlaceholder}</option>
            {imageFormatOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <Field.HelperText>{content.sourceHelp}</Field.HelperText>
      </Field.Root>

      <Field.Root colorPalette={palette}>
        <Field.Label>{content.selectTargetLabel}</Field.Label>
        <NativeSelect.Root>
          <NativeSelect.Field
            value={targetFormat}
            onChange={(event) =>
              onTargetFormatChange(event.currentTarget.value)
            }
          >
            <option value="">{content.selectPlaceholder}</option>
            {imageFormatOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <Field.HelperText>{content.targetHelp}</Field.HelperText>
      </Field.Root>

      {(sameFormatMessage || showBrowserWarning) && (
        <GridItem colSpan={{ base: 1, md: 2 }}>
          {sameFormatMessage && (
            <Text fontSize="sm" color="fg.warning">
              {sameFormatMessage}
            </Text>
          )}
          {showBrowserWarning && (
            <Text fontSize="sm" color="orange.500">
              {content.browserSupportWarning}
            </Text>
          )}
        </GridItem>
      )}
    </SimpleGrid>
  );
};

interface ImageConverterSettingsProps {
  targetFormat: string;
  quality: number;
  optimizeOutput: boolean;
  resizeEnabled: boolean;
  resizeMode: ResizeMode;
  resizeValue: string;
  firstResizableItem: { originalWidth: number; originalHeight: number } | null;
  content: HeroContent;
  onQualityChange: (quality: number) => void;
  onOptimizeOutputChange: (optimize: boolean) => void;
  onResizeEnabledChange: (enabled: boolean) => void;
  onResizeModeChange: (mode: ResizeMode) => void;
  onResizeValueChange: (value: string) => void;
}

export const ImageConverterSettings: React.FC<ImageConverterSettingsProps> = ({
  targetFormat,
  quality,
  optimizeOutput,
  resizeEnabled,
  resizeMode,
  resizeValue,
  firstResizableItem,
  content,
  onQualityChange,
  onOptimizeOutputChange,
  onResizeEnabledChange,
  onResizeModeChange,
  onResizeValueChange,
}) => {
  const { palette } = useColorPalette();
  const targetFormatSizeNote = getTargetFormatSizeNote(targetFormat);

  const parsedResizeValue = Number(resizeValue);
  const calculatedResizeText =
    resizeEnabled &&
    firstResizableItem &&
    Number.isFinite(parsedResizeValue) &&
    parsedResizeValue > 0
      ? resizeMode === "width"
        ? `The height will be calculated from the image aspect ratio: ${Math.max(
            1,
            Math.round(
              (firstResizableItem.originalHeight * parsedResizeValue) /
                firstResizableItem.originalWidth,
            ),
          )} px.`
        : `The width will be calculated from the image aspect ratio: ${Math.max(
            1,
            Math.round(
              (firstResizableItem.originalWidth * parsedResizeValue) /
                firstResizableItem.originalHeight,
            ),
          )} px.`
      : resizeEnabled
        ? resizeMode === "width"
          ? "The height will be calculated automatically from the image aspect ratio."
          : "The width will be calculated automatically from the image aspect ratio."
        : "";

  const showQualitySlider = targetFormat === "jpg" || targetFormat === "webp" || targetFormat === "avif";

  return (
    <SimpleGrid columns={1} gap={4}>
      <GridItem>
        <VStack
          align="stretch"
          gap={3}
          p={4}
          borderRadius="xl"
          border="1px solid"
          borderColor="border"
          bg="bg"
        >
          <Checkbox.Root
            checked={optimizeOutput}
            onCheckedChange={(details) =>
              onOptimizeOutputChange(!!details.checked)
            }
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>{"Optimize output"}</Checkbox.Label>
          </Checkbox.Root>

          <Text color="fg.muted" fontSize="sm">
            {targetFormatSizeNote ||
              "Use smaller output settings when the selected format supports it."}
          </Text>

          {optimizeOutput && showQualitySlider && (
            <VStack align="stretch" gap={2}>
              <Text color="fg.muted" fontSize="sm">
                {
                  "Uses smaller output settings where the selected format supports it. Some lossless formats may still remain large."
                }
              </Text>
              <Field.Root>
                <Slider.Root
                  colorPalette={palette}
                  min={10}
                  max={100}
                  step={5}
                  maxW={200}
                  w={"full"}
                  value={[Math.round(quality * 100)]}
                  variant="solid"
                  onValueChange={(details) =>
                    onQualityChange((details.value[0] ?? 80) / 100)
                  }
                >
                  <HStack justify="space-between" gap={3}>
                    <Slider.Label>{content.qualityLabel}</Slider.Label>
                    <Slider.ValueText>{`${Math.round(quality * 100)}%`}</Slider.ValueText>
                  </HStack>

                  <Slider.Control>
                    <Slider.Track>
                      <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumb index={0} />
                  </Slider.Control>
                </Slider.Root>
                <Field.HelperText>{content.qualityHint}</Field.HelperText>
              </Field.Root>
            </VStack>
          )}
        </VStack>
      </GridItem>

      <GridItem>
        <VStack
          align="stretch"
          gap={3}
          p={4}
          borderRadius="xl"
          border="1px solid"
          borderColor="border"
          bg="bg"
        >
          <Checkbox.Root
            checked={resizeEnabled}
            onCheckedChange={(details) =>
              onResizeEnabledChange(!!details.checked)
            }
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>{"Resize"}</Checkbox.Label>
          </Checkbox.Root>

          <Text color="fg.muted" fontSize="sm">
            {
              "Resize images before conversion. The missing dimension is calculated from each image aspect ratio."
            }
          </Text>

          {resizeEnabled && (
            <VStack align="stretch" gap={3}>
              <SegmentGroup.Root
                colorPalette={palette}
                value={resizeMode}
                onValueChange={(details) =>
                  onResizeModeChange(details.value as ResizeMode)
                }
                width="fit-content"
                alignSelf="flex-start"
              >
                <SegmentGroup.Indicator />
                <SegmentGroup.Items
                  items={[
                    { label: "Width", value: "width" },
                    { label: "Height", value: "height" },
                  ]}
                />
              </SegmentGroup.Root>
              <Field.Root>
                <Field.Label>
                  {resizeMode === "width" ? "Desired width" : "Desired height"}
                </Field.Label>
                <Input
                  value={resizeValue}
                  onChange={(event) => onResizeValueChange(event.target.value)}
                  placeholder={resizeMode === "width" ? "1024" : "768"}
                  inputMode="numeric"
                />
                <Field.HelperText>{calculatedResizeText}</Field.HelperText>
              </Field.Root>
            </VStack>
          )}
        </VStack>
      </GridItem>
    </SimpleGrid>
  );
};

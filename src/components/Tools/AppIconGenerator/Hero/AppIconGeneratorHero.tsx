import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { Toaster, toaster } from "@/components/ui/toaster";
import type { UploadedImage } from "@/components/Tools/AppIconGenerator/appIconGeneratorTypes";
import { appIconGeneratorHeaderData } from "@/data/tools/appIconGenerator/appIconGeneratorData";
import {
  generateAndDownloadAppIconArchive,
  getSelectedPlatformCount,
  isAndroidFileNameValid,
} from "@/services/appIconGenerator";
import { Box, GridItem, SimpleGrid, Spacer, VStack } from "@chakra-ui/react";
import React from "react";
import type { ResolveImageDimensionsFn } from "./AppIconImageUpload";
import AppIconGenerateButton from "./AppIconGenerateButton";
import AppIconGeneratorMarquee from "./AppIconGeneratorMarquee";
import AppIconImageUpload from "./AppIconImageUpload";
import AppIconPlatformOptions from "./AppIconPlatformOptions";
import type { AppIconPlatformSelection } from "../appIconGeneratorTypes";

const INITIAL_SELECTION: AppIconPlatformSelection = {
  iphone: false,
  ipad: false,
  watchos: false,
  macos: false,
  android: false,
};

type Props = {
  resolveImageDimensions?: ResolveImageDimensionsFn;
  onGenerateArchive?: typeof generateAndDownloadAppIconArchive;
};

const AppIconGeneratorHero: React.FC<Props> = ({
  resolveImageDimensions,
  onGenerateArchive = generateAndDownloadAppIconArchive,
}) => {
  const [image, setImage] = React.useState<UploadedImage | null>(null);
  const [imageError, setImageError] = React.useState<string | null>(null);
  const [imageWarning, setImageWarning] = React.useState<string | null>(null);
  const [selection, setSelection] =
    React.useState<AppIconPlatformSelection>(INITIAL_SELECTION);
  const [androidFileName, setAndroidFileName] = React.useState("ic_launcher");
  const [isGenerating, setIsGenerating] = React.useState(false);

  const platformCount = getSelectedPlatformCount(selection);
  const isGenerateDisabled =
    !image ||
    platformCount === 0 ||
    (selection.android && !isAndroidFileNameValid(androidFileName));

  const handleImageAccepted = (nextImage: UploadedImage) => {
    if (image?.previewUrl) {
      URL.revokeObjectURL(image.previewUrl);
    }

    setImage(nextImage);
    setImageError(null);
    setImageWarning(
      nextImage.width === 1024 && nextImage.height === 1024
        ? null
        : "This image is not 1024 × 1024. You can still generate icons, but the result may be softer on larger sizes.",
    );
  };

  const handleImageRemoved = () => {
    if (image?.previewUrl) {
      URL.revokeObjectURL(image.previewUrl);
    }

    setImage(null);
    setImageError(null);
    setImageWarning(null);
  };

  React.useEffect(() => {
    return () => {
      if (image?.previewUrl) {
        URL.revokeObjectURL(image.previewUrl);
      }
    };
  }, [image]);

  const handleGenerate = async () => {
    if (!image || isGenerateDisabled) {
      return;
    }

    try {
      setIsGenerating(true);
      const result = await onGenerateArchive({
        imageFile: image.file,
        selection,
        androidFileName,
      });

      toaster.success({
        title: "Icon pack ready",
        description: `${result.filename} has been downloaded to your device.`,
        closable: true,
      });

      handleImageRemoved();
    } catch {
      toaster.error({
        title: "Generation failed",
        description:
          "We could not generate the icon archive. Try again with a different image.",
        closable: true,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box as="section">
      <Toaster />
      <SectionHeader
        tagline={appIconGeneratorHeaderData.badge}
        headline={appIconGeneratorHeaderData.title}
        description={appIconGeneratorHeaderData.description}
      />
      <Spacer p={4} />
      <AppIconGeneratorMarquee />
      <Spacer p={6} />
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 6, lg: 8 }}>
        <GridItem>
          <Box
            borderWidth="1px"
            borderRadius="2xl"
            p={{ base: 4, md: 6 }}
            bg="bg.panel"
          >
            <AppIconImageUpload
              image={image}
              error={imageError}
              warning={imageWarning}
              onImageAccepted={handleImageAccepted}
              onImageRemoved={handleImageRemoved}
              onValidationMessage={setImageError}
              resolveImageDimensions={resolveImageDimensions}
            />
          </Box>
        </GridItem>
        <GridItem>
          <VStack
            align="stretch"
            gap={6}
            borderWidth="1px"
            borderRadius="2xl"
            p={{ base: 4, md: 6 }}
            bg="bg.panel"
          >
            <AppIconPlatformOptions
              selection={selection}
              androidFileName={androidFileName}
              onPlatformChange={(key, checked) => {
                setSelection((current) => ({ ...current, [key]: checked }));
              }}
              onAndroidFileNameChange={setAndroidFileName}
            />
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

export default AppIconGeneratorHero;

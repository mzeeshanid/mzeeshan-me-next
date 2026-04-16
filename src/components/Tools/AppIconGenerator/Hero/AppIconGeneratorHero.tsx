import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import type { UploadedImage } from "@/components/Tools/AppIconGenerator/appIconGeneratorTypes";
import { appIconGeneratorHeaderData } from "@/data/tools/appIconGenerator/appIconGeneratorData";
import { generateAndDownloadAppIconArchive } from "@/services/appIconGenerator";
import { Box, Spacer } from "@chakra-ui/react";
import React from "react";
import type { ResolveImageDimensionsFn } from "./AppIconGeneratorImageUpload";
import AppIconGeneratorMarquee from "./AppIconGeneratorMarquee";
import AndroidIconGenerator from "./AppIconGeneratorAndroid";
import IosIconGenerator from "./AppIconGeneratorIos";
import AppIconPreviewSection from "../Preview/AppIconGeneratorPreviewSection";

type Props = {
  resolveImageDimensions?: ResolveImageDimensionsFn;
  onGenerateArchive?: typeof generateAndDownloadAppIconArchive;
};

const AppIconGeneratorHero: React.FC<Props> = ({
  resolveImageDimensions,
  onGenerateArchive,
}) => {
  const [iosPreviewUrl, setIosPreviewUrl] = React.useState<string | undefined>(undefined);
  const [androidPreviewUrl, setAndroidPreviewUrl] = React.useState<string | undefined>(undefined);

  return (
    <Box as="section">
      {/* Title and description are visible at section level, outside any card */}
      <SectionHeader
        tagline={appIconGeneratorHeaderData.badge}
        headline={appIconGeneratorHeaderData.title}
        description={appIconGeneratorHeaderData.description}
      />
      <Spacer p={4} />
      <AppIconGeneratorMarquee />
      <Spacer p={6} />

      {/* iOS: image upload aligned with iOS platform checkboxes in one card */}
      <IosIconGenerator
        resolveImageDimensions={resolveImageDimensions}
        onGenerateArchive={onGenerateArchive}
        onImageChange={(img: UploadedImage | null) =>
          setIosPreviewUrl(img?.previewUrl)
        }
        onIconPreviewChange={setIosPreviewUrl}
      />

      <Spacer p={6} />

      {/* Android */}
      <AndroidIconGenerator onIconPreviewChange={setAndroidPreviewUrl} />

      <Spacer p={6} />
      <AppIconPreviewSection
        iosIconUrl={iosPreviewUrl}
        androidIconUrl={androidPreviewUrl}
      />
    </Box>
  );
};

export default AppIconGeneratorHero;

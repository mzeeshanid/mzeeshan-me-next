import { GalleryImage } from "@/components/Blog/ArticleContent/ArticleContent";
import { ImageGalleryProvider } from "@/components/ImageGallery/ImageGalleryContext";
import { MarkdownImage } from "@/components/Markdown/MarkdownImage";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import { driveDirectData } from "@/data/tools/driveDirect/driveDirectData";
import { DriveDirectShareLinkStepItem } from "@/data/tools/driveDirect/driveDirectStepsData";
import { Box, Center, Icon, Spacer, Timeline } from "@chakra-ui/react";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { markdownSanitizeSchema } from "../../../../../styles/markdownSanitizeSchema";
import {
  getMarkdownTheme,
  markdownComponents,
} from "../../../../../styles/markdownTheme";

type Props = {};

const DriveDirectSteps: React.FC<Props> = (props: Props) => {
  const { steps } = driveDirectData();
  const { palette } = useColorPalette();
  const markdownTheme = getMarkdownTheme();

  const images = React.useMemo(() => extractImages(steps.steps), [steps.steps]);

  const imageIndexMap = React.useMemo(() => {
    const map = new Map<string, number>();
    images.forEach((img, index) => {
      // key must be stable
      map.set(`${img.src}`, index);
    });
    return map;
  }, [images]);

  return (
    <Box as="section">
      <SectionHeader
        tagline={steps.header.badge}
        headline={steps.header.title}
        description={steps.header.desc}
        align={"center"}
        textAlign={"center"}
      />
      <Spacer p={4} />
      <Center>
        <ImageGalleryProvider images={images}>
          <Timeline.Root
            colorPalette={palette}
            maxW={"4xl"}
            variant={"subtle"}
            size={"xl"}
          >
            {steps.steps.map((step, idx) => (
              <Timeline.Item key={idx}>
                <Timeline.Connector>
                  <Timeline.Separator />
                  <Timeline.Indicator>
                    <Icon as={step.icon} size={"md"}></Icon>
                  </Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                  <Timeline.Title>{step.title}</Timeline.Title>
                  <Timeline.Description>{step.subtitle}</Timeline.Description>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      ...markdownTheme,
                      ...markdownComponents,
                    }}
                    rehypePlugins={[
                      rehypeRaw,
                      [rehypeSanitize, markdownSanitizeSchema],
                    ]}
                  >
                    {step.desc}
                  </ReactMarkdown>
                  <MarkdownImage
                    src={step.image.src}
                    alt={step.image.alt}
                    index={idx}
                  />
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline.Root>
        </ImageGalleryProvider>
      </Center>
    </Box>
  );
};

const extractImages = (
  steps: DriveDirectShareLinkStepItem[],
): GalleryImage[] => {
  const images: GalleryImage[] = [];
  steps
    .filter((step) => step.image)
    .forEach((step) => {
      images.push({
        src: step.image.src,
        alt: step.image.alt,
      });
    });
  return images;
};

export default DriveDirectSteps;

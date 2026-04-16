import { GalleryImage } from "@/components/Blog/ArticleContent/ArticleContent";
import { ImageGalleryProvider } from "@/components/ImageGallery/ImageGalleryContext";
import { MarkdownImage } from "@/components/Markdown/MarkdownImage";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  androidStudioStepsData,
  type AndroidStudioStepItem,
} from "@/data/tools/appIconGenerator/androidStudioStepsData";
import {
  Badge,
  Blockquote,
  Box,
  Center,
  Float,
  HStack,
  Icon,
  Link,
  Spacer,
  Text,
  Timeline,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { FaArrowUpRightFromSquare, FaBook, FaYoutube } from "react-icons/fa6";
import { markdownSanitizeSchema } from "../../../../../styles/markdownSanitizeSchema";
import {
  getMarkdownTheme,
  markdownComponents,
} from "../../../../../styles/markdownTheme";


// ─── Docs card ────────────────────────────────────────────────────────────────

const DocsCard: React.FC<{
  label: string;
  href: string;
  desc: string;
}> = ({ label, href, desc }) => {
  const { palette } = useColorPalette();

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: "none" }}>
      <Box
        borderWidth="1px"
        borderRadius="xl"
        p={5}
        bg="bg.panel"
        transition="all 0.18s"
        _hover={{ borderColor: `${palette}.500`, shadow: "sm", transform: "translateY(-1px)" }}
        h="full"
      >
        <VStack align="flex-start" gap={3} h="full">
          <HStack gap={3}>
            <Box
              p={2}
              borderRadius="lg"
              bg={`${palette}.subtle`}
              color={`${palette}.fg`}
            >
              <Icon as={FaBook} boxSize={4} />
            </Box>
            <Badge colorPalette={palette} variant="subtle" size="sm">
              {"Official Docs"}
            </Badge>
          </HStack>
          <Text fontWeight="semibold" fontSize="sm" lineHeight="1.4">
            {label}
          </Text>
          <Text fontSize="xs" color="fg.muted" flex={1}>
            {desc}
          </Text>
          <HStack gap={1} color={`${palette}.fg`} fontSize="xs" fontWeight="medium">
            <Text>{"developer.android.com"}</Text>
            <Icon as={FaArrowUpRightFromSquare} boxSize={3} />
          </HStack>
        </VStack>
      </Box>
    </Link>
  );
};

// ─── Video card ───────────────────────────────────────────────────────────────

const VideoCard: React.FC<{
  label: string;
  embedId: string;
}> = ({ label, embedId }) => {
  const [playing, setPlaying] = React.useState(false);

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      bg="bg.panel"
      h="full"
    >
      {/* Embed / thumbnail */}
      <Box position="relative" w="full" style={{ aspectRatio: "16/9" }} bg="black">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${embedId}?autoplay=1&rel=0`}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: 0, display: "block" }}
          />
        ) : (
          <Box
            position="relative"
            w="full"
            h="full"
            cursor="pointer"
            onClick={() => setPlaying(true)}
          >
            {/* YouTube thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${embedId}/maxresdefault.jpg`}
              alt={label}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {/* Play overlay */}
            <Box
              position="absolute"
              inset={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="blackAlpha.400"
              transition="background 0.18s"
              _hover={{ bg: "blackAlpha.550" }}
            >
              <Box
                w="64px"
                h="44px"
                borderRadius="12px"
                bg="#FF0000"
                display="flex"
                alignItems="center"
                justifyContent="center"
                shadow="lg"
                transition="transform 0.18s"
                _hover={{ transform: "scale(1.08)" }}
              >
                <Icon as={FaYoutube} boxSize={7} color="white" />
              </Box>
            </Box>
          </Box>
        )}
      </Box>

    </Box>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const AppIconGeneratorAndroidStudioSteps: React.FC = () => {
  const { palette } = useColorPalette();
  const markdownTheme = getMarkdownTheme();
  const data = androidStudioStepsData;

  const images = React.useMemo(() => extractImages(data.steps), [data.steps]);

  return (
    <Box as="section">
      <SectionHeader
        tagline={data.header.badge}
        headline={data.header.title}
        description={data.header.desc}
        align="center"
        textAlign="center"
      />

      <Spacer p={4} />

      {/* Intro blockquote */}
      <Box maxW="3xl" mx="auto">
        <Blockquote.Root bg="bg.subtle" padding="8" colorPalette={palette}>
          <Float placement="bottom-end" offset="10">
            <Blockquote.Icon opacity="0.4" boxSize="10" rotate="180deg" />
          </Float>
          <Blockquote.Content>
            {data.intro}
          </Blockquote.Content>
        </Blockquote.Root>
      </Box>

      <Spacer p={6} />

      {/* Steps timeline */}
      <Center>
        <ImageGalleryProvider images={images}>
          <Timeline.Root
            colorPalette={palette}
            maxW="4xl"
            variant="subtle"
            size="xl"
          >
            {data.steps.map((step, idx) => (
              <Timeline.Item key={idx}>
                <Timeline.Connector>
                  <Timeline.Separator />
                  <Timeline.Indicator>
                    <Icon as={step.icon} size="md" />
                  </Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                  <Timeline.Title>{step.title}</Timeline.Title>
                  <Timeline.Description>{step.subtitle}</Timeline.Description>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{ ...markdownTheme, ...markdownComponents }}
                    rehypePlugins={[rehypeRaw, [rehypeSanitize, markdownSanitizeSchema]]}
                  >
                    {step.desc}
                  </ReactMarkdown>
                  <MarkdownImage
                    src={step.image.src}
                    alt={step.image.alt}
                    index={idx}
                    my={4}
                  />
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline.Root>
        </ImageGalleryProvider>
      </Center>

      <Spacer p={6} />

      {/* Video + Docs cards */}
      <Box maxW="4xl" mx="auto">
        <Text
          fontSize="sm"
          fontWeight="semibold"
          color="fg.muted"
          textTransform="uppercase"
          letterSpacing="wider"
          mb={4}
        >
          {"Learn More"}
        </Text>
        <VStack align="stretch" gap={4}>
          <VideoCard
            label={data.video.label}
            embedId={data.video.embedId}
          />
          <DocsCard
            label={data.docs.label}
            href={data.docs.href}
            desc={data.docs.desc}
          />
        </VStack>
      </Box>
    </Box>
  );
};

const extractImages = (steps: AndroidStudioStepItem[]): GalleryImage[] =>
  steps
    .filter((s) => s.image)
    .map((s) => ({ src: s.image.src, alt: s.image.alt }));

export default AppIconGeneratorAndroidStudioSteps;

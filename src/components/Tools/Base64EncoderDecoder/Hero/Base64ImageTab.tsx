import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  encodeFile,
  encodingOverheadLabel,
  encodeToDataURI,
} from "@/services/base64Service";
import {
  Badge,
  Blockquote,
  Box,
  Button,
  Card,
  Clipboard,
  HStack,
  Icon,
  Input,
  NativeSelect,
  Spinner,
  Tabs,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import {
  FaCloudArrowUp,
  FaImage,
  FaTriangleExclamation,
} from "react-icons/fa6";
import { FaArrowRotateLeft } from "react-icons/fa6";

const ACCEPTED_TYPES =
  "image/png,image/jpeg,image/gif,image/webp,image/svg+xml,image/x-icon";

type ImageResult = {
  base64: string;
  mimeType: string;
  originalSize: number;
  objectUrl: string;
  name: string;
};

const Base64ImageTab: React.FC = () => {
  const { palette } = useColorPalette();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<ImageResult | null>(null);
  const [altText, setAltText] = React.useState("image");

  React.useEffect(() => {
    return () => {
      if (result?.objectUrl) URL.revokeObjectURL(result.objectUrl);
    };
  }, [result]);

  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, GIF, WebP, SVG, ICO).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10 MB.");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const base64 = await encodeFile(file);
      const objectUrl = URL.createObjectURL(file);
      setResult({
        base64,
        mimeType: file.type || "image/png",
        originalSize: file.size,
        objectUrl,
        name: file.name,
      });
    } catch {
      setError("Failed to encode the image. Please try a different file.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFiles = (files: FileList | File[] | null | undefined) => {
    if (!files) return;
    const file = Array.from(files)[0];
    if (file) processFile(file);
  };

  const reset = () => {
    if (result?.objectUrl) URL.revokeObjectURL(result.objectUrl);
    setResult(null);
    setError(null);
    setAltText("image");
  };

  const dataURI = result ? encodeToDataURI(result.base64, result.mimeType) : "";
  const htmlSnippet = result ? `<img src="${dataURI}" alt="${altText}" />` : "";
  const cssSnippet = result ? `background-image: url("${dataURI}");` : "";
  const mdSnippet = result ? `![${altText}](${dataURI})` : "";

  return (
    <VStack align="stretch" gap={4}>
      {!result && !isLoading && (
        <Box
          borderWidth="2px"
          borderStyle="dashed"
          borderColor={isDragOver ? `${palette}.focusRing` : "border"}
          borderRadius="2xl"
          bg={isDragOver ? `${palette}.subtle` : "bg.subtle"}
          minH="14rem"
          px={6}
          py={8}
          transition="all 0.2s ease"
          cursor="pointer"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES}
            style={{ display: "none" }}
            onChange={(e) => handleFiles(e.target.files)}
          />
          <VStack gap={3}>
            <Icon as={FaCloudArrowUp} boxSize={10} color={`${palette}.fg`} />
            <Text fontWeight="semibold">
              Drop an image here or click to upload
            </Text>
            <Text fontSize="sm" color="fg.muted">
              PNG, JPG, GIF, WebP, SVG, ICO · max 10 MB
            </Text>
          </VStack>
        </Box>
      )}

      {isLoading && (
        <Box
          minH="14rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack gap={3}>
            <Spinner size="lg" colorPalette={palette} />
            <Text color="fg.muted">Encoding image...</Text>
          </VStack>
        </Box>
      )}

      {error && (
        <Box
          bg="red.subtle"
          borderRadius="md"
          px={4}
          py={3}
          borderLeft="3px solid"
          borderLeftColor="red.focusRing"
        >
          <HStack gap={2}>
            <Icon as={FaTriangleExclamation} color="red.fg" />
            <Text color="red.fg" fontSize="sm">
              {error}
            </Text>
          </HStack>
        </Box>
      )}

      {result && (
        <VStack align="stretch" gap={4}>
          <HStack justify="space-between" flexWrap="wrap" gap={2}>
            <HStack gap={2} flexWrap="wrap">
              <Icon as={FaImage} color={`${palette}.fg`} />
              <Text fontWeight="semibold" fontSize="sm" wordBreak="break-all">
                {result.name}
              </Text>
              <Badge colorPalette="orange" variant="subtle" fontSize="xs">
                {encodingOverheadLabel(result.originalSize)}
              </Badge>
            </HStack>
            <Button size="sm" variant="ghost" onClick={reset}>
              <Icon as={FaArrowRotateLeft} />
              Change image
            </Button>
          </HStack>

          <img
            src={result.objectUrl}
            alt={altText}
            style={{
              maxHeight: "160px",
              maxWidth: "100%",
              objectFit: "contain",
              borderRadius: "8px",
              border: "1px solid var(--chakra-colors-border)",
            }}
          />

          <Card.Root variant="outline">
            <Card.Body>
              <VStack align="stretch" gap={3}>
                <HStack justify="space-between">
                  <Text fontWeight="semibold" fontSize="sm">
                    Base64 String
                  </Text>
                  <Clipboard.Root value={result.base64}>
                    <Clipboard.Trigger asChild>
                      <Button
                        size="2xs"
                        variant="surface"
                        colorPalette={palette}
                      >
                        <Clipboard.Indicator />
                        Copy raw
                      </Button>
                    </Clipboard.Trigger>
                  </Clipboard.Root>
                </HStack>
                <Textarea
                  readOnly
                  value={result.base64}
                  rows={4}
                  fontFamily="mono"
                  fontSize="xs"
                  bg="bg.subtle"
                  resize="vertical"
                />
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root variant="outline">
            <Card.Header pb={2}>
              <HStack justify="space-between" flexWrap="wrap" gap={2}>
                <Text fontWeight="semibold" fontSize="sm">
                  Ready-to-Use Snippets
                </Text>
                <HStack gap={2}>
                  <Text fontSize="xs" color="fg.muted">
                    alt text:
                  </Text>
                  <Input
                    size="xs"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    maxW="140px"
                    placeholder="image"
                  />
                </HStack>
              </HStack>
            </Card.Header>
            <Card.Body pt={0}>
              <Tabs.Root defaultValue="html" size="sm">
                <Tabs.List>
                  <Tabs.Trigger value="html">HTML</Tabs.Trigger>
                  <Tabs.Trigger value="css">CSS</Tabs.Trigger>
                  <Tabs.Trigger value="md">Markdown</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="html">
                  <VStack align="stretch" gap={2} mt={2}>
                    <Textarea
                      readOnly
                      value={htmlSnippet}
                      rows={3}
                      fontFamily="mono"
                      fontSize="xs"
                      bg="bg.subtle"
                      resize="vertical"
                    />
                    <Clipboard.Root value={htmlSnippet}>
                      <Clipboard.Trigger asChild>
                        <Button
                          size="xs"
                          variant="surface"
                          colorPalette={palette}
                          alignSelf="flex-end"
                        >
                          <Clipboard.Indicator />
                          Copy HTML
                        </Button>
                      </Clipboard.Trigger>
                    </Clipboard.Root>
                  </VStack>
                </Tabs.Content>
                <Tabs.Content value="css">
                  <VStack align="stretch" gap={2} mt={2}>
                    <Textarea
                      readOnly
                      value={cssSnippet}
                      rows={3}
                      fontFamily="mono"
                      fontSize="xs"
                      bg="bg.subtle"
                      resize="vertical"
                    />
                    <Clipboard.Root value={cssSnippet}>
                      <Clipboard.Trigger asChild>
                        <Button
                          size="xs"
                          variant="surface"
                          colorPalette={palette}
                          alignSelf="flex-end"
                        >
                          <Clipboard.Indicator />
                          Copy CSS
                        </Button>
                      </Clipboard.Trigger>
                    </Clipboard.Root>
                  </VStack>
                </Tabs.Content>
                <Tabs.Content value="md">
                  <VStack align="stretch" gap={2} mt={2}>
                    <Textarea
                      readOnly
                      value={mdSnippet}
                      rows={3}
                      fontFamily="mono"
                      fontSize="xs"
                      bg="bg.subtle"
                      resize="vertical"
                    />
                    <Clipboard.Root value={mdSnippet}>
                      <Clipboard.Trigger asChild>
                        <Button
                          size="xs"
                          variant="surface"
                          colorPalette={palette}
                          alignSelf="flex-end"
                        >
                          <Clipboard.Indicator />
                          Copy Markdown
                        </Button>
                      </Clipboard.Trigger>
                    </Clipboard.Root>
                  </VStack>
                </Tabs.Content>
              </Tabs.Root>
            </Card.Body>
          </Card.Root>
        </VStack>
      )}

      <Blockquote.Root variant="subtle">
        <Blockquote.Content>
          Your image never leaves this browser. Encoding happens entirely on
          your device.
        </Blockquote.Content>
      </Blockquote.Root>
    </VStack>
  );
};

export default Base64ImageTab;

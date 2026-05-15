import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  decodeBase64ToBlob,
  downloadBlob,
  encodeFile,
  fixPadding,
  formatBytes,
  getMimeTypeFromFilename,
  inferTypeFromBase64,
  type InferredFileType,
} from "@/services/base64Service";
import {
  Badge,
  Blockquote,
  Box,
  Button,
  Clipboard,
  Field,
  HStack,
  Input,
  SegmentGroup,
  Spinner,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import {
  FaArrowRotateLeft,
  FaCloudArrowUp,
  FaDownload,
  FaFile,
  FaTriangleExclamation,
} from "react-icons/fa6";

const Base64FileTab: React.FC = () => {
  const { palette } = useColorPalette();
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const [mode, setMode] = React.useState<"encode" | "decode">("encode");
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Encode state
  const [encodeFile_, setEncodeFile] = React.useState<File | null>(null);
  const [encodedBase64, setEncodedBase64] = React.useState("");

  // Decode state
  const [decodeInput, setDecodeInput] = React.useState("");
  const [decodeFilename, setDecodeFilename] = React.useState("");
  const [decodeError, setDecodeError] = React.useState("");

  const handleModeChange = (newMode: "encode" | "decode") => {
    setMode(newMode);
    setError(null);
    setEncodeFile(null);
    setEncodedBase64("");
    setDecodeInput("");
    setDecodeFilename("");
    setDecodeError("");
  };

  const processEncodeFile = async (file: File) => {
    setError(null);
    setIsLoading(true);
    try {
      const base64 = await encodeFile(file);
      setEncodeFile(file);
      setEncodedBase64(base64);
    } catch {
      setError("Failed to read the file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFiles = (files: FileList | File[] | null | undefined) => {
    if (!files) return;
    const file = Array.from(files)[0];
    if (file) processEncodeFile(file);
  };

  const inferredType = React.useMemo<InferredFileType | null>(
    () => (decodeInput.trim() ? inferTypeFromBase64(decodeInput) : null),
    [decodeInput],
  );

  const handleDecode = () => {
    setDecodeError("");
    if (!decodeInput.trim()) {
      setDecodeError("Please paste a Base64 string to decode.");
      return;
    }
    try {
      const base = decodeFilename.trim() || "file";
      const hasExtension = base.includes(".");
      const effectiveFilename =
        !hasExtension && inferredType ? `${base}.${inferredType.extension}` : base;
      const mimeType =
        inferredType?.mimeType ?? getMimeTypeFromFilename(effectiveFilename);
      const blob = decodeBase64ToBlob(
        fixPadding(decodeInput.replace(/\s/g, "")),
        mimeType,
      );
      downloadBlob(blob, effectiveFilename);
    } catch {
      setDecodeError(
        "Failed to decode. Check that the Base64 string is valid and try again.",
      );
    }
  };

  return (
    <VStack align="stretch" gap={4}>
      <SegmentGroup.Root
        value={mode}
        onValueChange={(e) => handleModeChange(e.value as "encode" | "decode")}
        size="sm"
        width="fit-content"
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Item value="encode">
          <SegmentGroup.ItemText>Encode file → Base64</SegmentGroup.ItemText>
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
        <SegmentGroup.Item value="decode">
          <SegmentGroup.ItemText>Decode Base64 → file</SegmentGroup.ItemText>
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
      </SegmentGroup.Root>

      {mode === "encode" && (
        <>
          {!encodeFile_ && !isLoading && (
            <Box
              borderWidth="2px"
              borderStyle="dashed"
              borderColor={isDragOver ? `${palette}.focusRing` : "border"}
              borderRadius="2xl"
              bg={isDragOver ? `${palette}.subtle` : "bg.subtle"}
              minH="12rem"
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
                style={{ display: "none" }}
                onChange={(e) => handleFiles(e.target.files)}
              />
              <VStack gap={3}>
                <Icon
                  as={FaCloudArrowUp}
                  boxSize={10}
                  color={`${palette}.fg`}
                />
                <Text fontWeight="semibold">
                  Drop any file here or click to upload
                </Text>
                <Text fontSize="sm" color="fg.muted">
                  PDF, DOCX, MP3, ZIP, images — any file type
                </Text>
              </VStack>
            </Box>
          )}

          {isLoading && (
            <Box
              minH="12rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <VStack gap={3}>
                <Spinner size="lg" colorPalette={palette} />
                <Text color="fg.muted">Encoding file...</Text>
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
                <DeferredIcon icon={FaTriangleExclamation} color="red.fg" />
                <Text color="red.fg" fontSize="sm">
                  {error}
                </Text>
              </HStack>
            </Box>
          )}

          {encodeFile_ && encodedBase64 && (
            <VStack align="stretch" gap={3}>
              <HStack justify="space-between" flexWrap="wrap" gap={2}>
                <HStack gap={2}>
                  <DeferredIcon icon={FaFile} color={`${palette}.fg`} />
                  <Text fontWeight="semibold" fontSize="sm">
                    {encodeFile_.name}
                  </Text>
                  <Text fontSize="xs" color="fg.muted">
                    ({formatBytes(encodeFile_.size)})
                  </Text>
                </HStack>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEncodeFile(null);
                    setEncodedBase64("");
                    setError(null);
                  }}
                >
                  <DeferredIcon icon={FaArrowRotateLeft} />
                  Change file
                </Button>
              </HStack>

              <Field.Root>
                <Field.Label>
                  <HStack justify="space-between" w="full">
                    <Text>Base64 output</Text>
                    <HStack gap={2}>
                      <Clipboard.Root value={encodedBase64}>
                        <Clipboard.Trigger asChild>
                          <Button
                            size="2xs"
                            variant="surface"
                            colorPalette={palette}
                          >
                            <Clipboard.Indicator />
                            Copy
                          </Button>
                        </Clipboard.Trigger>
                      </Clipboard.Root>
                      <Button
                        size="2xs"
                        variant="surface"
                        colorPalette={palette}
                        onClick={() => {
                          const blob = new Blob([encodedBase64], {
                            type: "text/plain",
                          });
                          downloadBlob(blob, `${encodeFile_.name}.b64.txt`);
                        }}
                      >
                        <DeferredIcon icon={FaDownload} />
                        Download .txt
                      </Button>
                    </HStack>
                  </HStack>
                </Field.Label>
                <Textarea
                  readOnly
                  value={encodedBase64}
                  rows={8}
                  fontFamily="mono"
                  fontSize="xs"
                  bg="bg.subtle"
                  resize="vertical"
                />
                <Field.HelperText>
                  {encodedBase64.length} characters
                </Field.HelperText>
              </Field.Root>
            </VStack>
          )}
        </>
      )}

      {mode === "decode" && (
        <VStack align="stretch" gap={4}>
          <Field.Root invalid={!!decodeError && !decodeInput.trim()}>
            <Field.Label>
              <HStack justify="space-between" w="full">
                <Text>Paste Base64 string</Text>
                {inferredType && (
                  <Badge colorPalette="green" variant="subtle" size="sm">
                    Detected: {inferredType.label}
                  </Badge>
                )}
              </HStack>
            </Field.Label>
            <Textarea
              placeholder="Paste your Base64-encoded file content here..."
              value={decodeInput}
              onChange={(e) => {
                setDecodeInput(e.target.value);
                setDecodeError("");
              }}
              rows={8}
              fontFamily="mono"
              fontSize="xs"
              resize="vertical"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Output filename</Field.Label>
            <Input
              placeholder="e.g. invoice, photo, archive (optional)"
              value={decodeFilename}
              onChange={(e) => {
                setDecodeFilename(e.target.value);
                setDecodeError("");
              }}
            />
            <Field.HelperText>
              {inferredType
                ? `Extension auto-detected as .${inferredType.extension} — enter a name without extension, or leave blank.`
                : "No type detected — include the extension (e.g. document.pdf) or the file will download without one."}
            </Field.HelperText>
          </Field.Root>

          {decodeError && (
            <Box
              bg="red.subtle"
              borderRadius="md"
              px={4}
              py={3}
              borderLeft="3px solid"
              borderLeftColor="red.focusRing"
            >
              <HStack gap={2}>
                <DeferredIcon icon={FaTriangleExclamation} color="red.fg" />
                <Text color="red.fg" fontSize="sm">
                  {decodeError}
                </Text>
              </HStack>
            </Box>
          )}

          <Button
            colorPalette={palette}
            onClick={handleDecode}
            alignSelf="flex-start"
          >
            <DeferredIcon icon={FaDownload} />
            Decode & Download
          </Button>
        </VStack>
      )}

      <Blockquote.Root variant="subtle">
        <Blockquote.Content>
          Your files are never uploaded. All encoding and decoding happens
          locally in your browser.
        </Blockquote.Content>
      </Blockquote.Root>
    </VStack>
  );
};

export default Base64FileTab;

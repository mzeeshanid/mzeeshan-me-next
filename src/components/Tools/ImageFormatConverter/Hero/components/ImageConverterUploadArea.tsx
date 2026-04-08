import {
  Blockquote,
  Box,
  Button,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import {
  FaArrowRotateLeft,
  FaCloudArrowUp,
  FaImage,
  FaTriangleExclamation,
} from "react-icons/fa6";

interface ImageConverterUploadAreaProps {
  fileCount: number;
  accept?: string;
  disabled?: boolean;
  error: string | null;
  onFilesAccepted: (files: File[]) => void;
  onFilesRemoved: () => void;
}

export const ImageConverterUploadArea: React.FC<ImageConverterUploadAreaProps> = ({
  fileCount,
  accept = "image/*",
  disabled = false,
  error,
  onFilesAccepted,
  onFilesRemoved,
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);

  const openFilePicker = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const processFiles = (files: FileList | File[] | null | undefined) => {
    if (!files || disabled) {
      return;
    }

    const nextFiles = Array.from(files);
    if (nextFiles.length > 0) {
      onFilesAccepted(nextFiles);
    }
  };

  return (
    <VStack align="stretch" gap={4}>
      <Box
        borderWidth="2px"
        borderStyle="dashed"
        borderColor={
          isDragOver
            ? "fg.success"
            : fileCount > 0
              ? "fg.success"
              : "border"
        }
        borderRadius="2xl"
        bg={isDragOver ? "bg.subtle" : "bg.subtle"}
        minH={{ base: "20rem", md: "24rem" }}
        px={{ base: 5, md: 6 }}
        py={{ base: 6, md: 8 }}
        transition="all 0.2s ease"
        cursor={disabled ? "not-allowed" : "pointer"}
        opacity={disabled ? 0.6 : 1}
        onClick={openFilePicker}
        onDragOver={(event) => {
          if (disabled) {
            return;
          }
          event.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(event) => {
          if (disabled) {
            return;
          }
          event.preventDefault();
          setIsDragOver(false);
          processFiles(event.dataTransfer.files);
        }}
      >
        <Input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          display="none"
          onChange={(event) => {
            processFiles(event.target.files);
            event.currentTarget.value = "";
          }}
        />

        {fileCount === 0 ? (
          <VStack h="full" justify="center" gap={4} textAlign="center">
            <Box p={5} borderRadius="full" bg="bg.panel">
              <Icon as={FaCloudArrowUp} boxSize={20} color="fg.muted" />
            </Box>
            <VStack gap={1}>
              <HStack justify="center" gap={2}>
                <Icon as={FaImage} color="fg.muted" />
                <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
                  {"Click or Drag and drop images"}
                </Text>
              </HStack>
              <Text color="fg.muted">
                {"You can select up to 20 images and convert them in one batch"}
              </Text>
            </VStack>
            <Button variant="surface" size="sm" disabled={disabled}>
              <FaImage />
              {"Choose Images"}
            </Button>
          </VStack>
        ) : (
          <VStack h="full" justify="center" gap={4} textAlign="center">
            <Box p={5} borderRadius="full" bg="bg.panel">
              <Icon as={FaImage} boxSize={20} color="fg.muted" />
            </Box>
            <VStack gap={1}>
              <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
                {`${fileCount} image${fileCount === 1 ? "" : "s"} selected`}
              </Text>
              <Text color="fg.muted">
                {"Add more images or clear the current batch before starting conversion"}
              </Text>
            </VStack>
            <HStack flexWrap="wrap" justify="center">
              <Button variant="surface" size="sm" disabled={disabled}>
                <FaImage />
                {"Add More Images"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(event) => {
                  event.stopPropagation();
                  onFilesRemoved();
                }}
              >
                <FaArrowRotateLeft />
                {"Clear Images"}
              </Button>
            </HStack>
          </VStack>
        )}
      </Box>

      <Blockquote.Root variant="subtle">
        <Blockquote.Content>
          {"No server upload. Conversion happens in the browser. Your image never leaves your device."}
        </Blockquote.Content>
      </Blockquote.Root>

      {error && (
        <HStack color="fg.error" align="flex-start">
          <Icon as={FaTriangleExclamation} mt="1" />
          <Text>{error}</Text>
        </HStack>
      )}
    </VStack>
  );
};
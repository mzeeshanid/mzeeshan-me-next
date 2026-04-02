import type { UploadedImage } from "@/components/Tools/AppIconGenerator/appIconGeneratorTypes";
import { useColorPalette } from "@/contexts/useColorPalette";
import { validateImageUploadFile } from "@/services/appIconGenerator";
import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import {
  FaArrowRotateLeft,
  FaCloudArrowUp,
  FaImage,
  FaTriangleExclamation,
} from "react-icons/fa6";

export type ResolveImageDimensionsFn = (
  file: File,
) => Promise<{ width: number; height: number }>;

type Props = {
  image: UploadedImage | null;
  error: string | null;
  warning: string | null;
  onImageAccepted: (image: UploadedImage) => void;
  onImageRemoved: () => void;
  onValidationMessage: (message: string | null) => void;
  resolveImageDimensions?: ResolveImageDimensionsFn;
};

const defaultResolveImageDimensions: ResolveImageDimensionsFn = async (
  file,
) => {
  const objectUrl = URL.createObjectURL(file);

  try {
    const dimensions = await new Promise<{ width: number; height: number }>(
      (resolve, reject) => {
        const img = new window.Image();
        img.onload = () =>
          resolve({ width: img.naturalWidth, height: img.naturalHeight });
        img.onerror = () =>
          reject(new Error("Failed to read image dimensions"));
        img.src = objectUrl;
      },
    );

    return dimensions;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};

const AppIconImageUpload: React.FC<Props> = ({
  image,
  error,
  warning,
  onImageAccepted,
  onImageRemoved,
  onValidationMessage,
  resolveImageDimensions = defaultResolveImageDimensions,
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);

  const processFile = React.useCallback(
    async (file: File) => {
      const validation = validateImageUploadFile(file);
      if (!validation.valid) {
        onValidationMessage(validation.error || "Invalid image");
        return;
      }

      try {
        const dimensions = await resolveImageDimensions(file);
        const previewUrl = URL.createObjectURL(file);
        onImageAccepted({
          file,
          previewUrl,
          width: dimensions.width,
          height: dimensions.height,
        });
        onValidationMessage(null);
      } catch {
        onValidationMessage(
          "We could not read that image. Try a different file.",
        );
      }
    },
    [onImageAccepted, onValidationMessage, resolveImageDimensions],
  );

  const openFilePicker = () => {
    inputRef.current?.click();
  };
  const { palette } = useColorPalette();
  return (
    <VStack align="stretch" gap={4}>
      <Box
        borderWidth="2px"
        borderStyle="dashed"
        borderColor={
          isDragOver
            ? `${palette}.focusRing`
            : image
              ? `${palette}.focusRing`
              : "border"
        }
        borderRadius="2xl"
        bg={isDragOver ? `${palette}.subtle` : "bg.subtle"}
        minH={{ base: "20rem", md: "26rem" }}
        px={{ base: 5, md: 6 }}
        py={{ base: 6, md: 8 }}
        transition="all 0.2s ease"
        cursor="pointer"
        onClick={openFilePicker}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={async (event) => {
          event.preventDefault();
          setIsDragOver(false);
          const file = event.dataTransfer.files?.[0];
          if (file) {
            await processFile(file);
          }
        }}
        data-testid="image-upload-dropzone"
      >
        <Input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          display="none"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (file) {
              await processFile(file);
            }
          }}
          data-testid="image-upload-input"
        />

        {!image ? (
          <VStack h="full" justify="center" gap={4} textAlign="center">
            <Box p={5} borderRadius="full" bg="bg.panel">
              <Icon as={FaCloudArrowUp} boxSize={20} color="fg.muted" />
            </Box>
            <VStack gap={1}>
              <HStack justify="center" gap={2}>
                <Icon as={FaImage} color="fg.muted" />
                <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
                  {"Click or Drag and drop image"}
                </Text>
              </HStack>
              <Text color="fg.muted">
                {"For best results, use a 1024 x 1024 pixel image"}
              </Text>
            </VStack>
            <Button variant="surface" size="sm">
              <FaImage />
              {"Choose Image"}
            </Button>
          </VStack>
        ) : (
          <VStack align="stretch" gap={4} h="full">
            <Box
              position="relative"
              borderRadius="xl"
              overflow="hidden"
              borderWidth="1px"
              bg="bg.panel"
              minH={{ base: "16rem", md: "20rem" }}
            >
              <Image
                src={image.previewUrl}
                alt="Uploaded app icon preview"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "contain" }}
                unoptimized
              />
            </Box>
            <Text fontWeight="medium">
              {`${image.file.name} • ${image.width} × ${image.height}`}
            </Text>
            <Button
              alignSelf="flex-start"
              variant="surface"
              onClick={(event) => {
                event.stopPropagation();
                onImageRemoved();
              }}
            >
              <FaArrowRotateLeft />
              {"Remove and upload different image"}
            </Button>
          </VStack>
        )}
      </Box>

      {error && (
        <HStack color="fg.error" align="flex-start">
          <Icon as={FaTriangleExclamation} mt="1" />
          <Text>{error}</Text>
        </HStack>
      )}
      {warning && (
        <HStack color="fg.warning" align="flex-start">
          <Icon as={FaTriangleExclamation} mt="1" />
          <Text>{warning}</Text>
        </HStack>
      )}
    </VStack>
  );
};

export default AppIconImageUpload;

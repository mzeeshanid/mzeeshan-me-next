import {
  AbsoluteCenter,
  Badge,
  Box,
  Button,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  ProgressCircle,
  Skeleton,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import {
  FaDownload,
  FaTrash,
  FaTriangleExclamation,
} from "react-icons/fa6";

import { useImageGallery } from "@/components/ImageGallery/ImageGalleryContext";
import { useColorPalette } from "@/contexts/useColorPalette";

export type ImageConverterBatchItemModel = {
  id: string;
  fileName: string;
  previewUrl: string;
  sourceFormat: string | null;
  progress: number;
  status: "pending" | "queued" | "converting" | "done" | "error";
  error: string | null;
  selected: boolean;
  outputFileName: string | null;
  convertedUrl: string | null;
  convertedSizeLabel: string | null;
  sizeComparisonLabel: string | null;
  originalSizeLabel: string;
  isLoadingPreview?: boolean;
};

type Props = {
  item: ImageConverterBatchItemModel;
  index: number;
  onToggleSelected: (id: string, checked: boolean) => void;
  onDownload: (id: string) => void;
  onRemove: (id: string) => void;
};

const statusLabelMap: Record<ImageConverterBatchItemModel["status"], string> = {
  pending: "Ready",
  queued: "Queued",
  converting: "Converting",
  done: "Done",
  error: "Error",
};

const ImageConverterBatchItem: React.FC<Props> = ({
  item,
  index,
  onToggleSelected,
  onDownload,
  onRemove,
}) => {
  const { palette } = useColorPalette();
  const { openAt } = useImageGallery();
  const previewSrc = item.convertedUrl ?? item.previewUrl;
  const progressValue = Math.max(0, Math.min(100, Math.round(item.progress)));

  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      bg="bg.subtle"
      h="100%"
    >
      <Box
        position="relative"
        aspectRatio={1}
        bg="bg.panel"
        cursor="zoom-in"
        onClick={() => openAt(index)}
      >
        {item.isLoadingPreview ? (
          <AbsoluteCenter>
            <Spinner size="lg" colorPalette={palette} />
          </AbsoluteCenter>
        ) : (
          <img
            src={previewSrc}
            alt={item.fileName}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </Box>
      <VStack align="stretch" gap={3} p={4}>
        <HStack justify="space-between" align="start">
          <VStack align="start" gap={1} minW={0}>
            <Text fontWeight="bold" lineClamp={2}>
              {item.fileName}
            </Text>
            <HStack wrap="wrap" gap={2}>
              <Badge variant="subtle">{statusLabelMap[item.status]}</Badge>
              <Text color="fg.muted" fontSize="xs">
                {item.sourceFormat
                  ? item.sourceFormat.toUpperCase()
                  : "Unsupported"}
              </Text>
              <Text color="fg.muted" fontSize="xs">
                {item.convertedSizeLabel ?? item.originalSizeLabel}
              </Text>
              {item.sizeComparisonLabel && (
                <Badge
                  colorPalette={
                    item.sizeComparisonLabel.startsWith("Smaller")
                      ? "green"
                      : "orange"
                  }
                  variant="subtle"
                >
                  {item.sizeComparisonLabel}
                </Badge>
              )}
            </HStack>
          </VStack>
          <ProgressCircle.Root
            value={progressValue}
            colorPalette={palette}
            size="lg"
            flexShrink={0}
          >
            <ProgressCircle.Circle css={{ "--thickness": "0.35rem" }}>
              <ProgressCircle.Track />
              <ProgressCircle.Range strokeLinecap="round" />
            </ProgressCircle.Circle>
            <AbsoluteCenter>
              <ProgressCircle.ValueText>
                {`${progressValue}%`}
              </ProgressCircle.ValueText>
            </AbsoluteCenter>
          </ProgressCircle.Root>
        </HStack>

        <Checkbox.Root
          checked={item.selected}
          disabled={item.status !== "done"}
          onCheckedChange={(details) =>
            onToggleSelected(item.id, !!details.checked)
          }
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Select for batch download</Checkbox.Label>
        </Checkbox.Root>

        {item.error && (
          <HStack color="fg.error" align="start">
            <Icon as={FaTriangleExclamation} mt="1" />
            <Text fontSize="sm">{item.error}</Text>
          </HStack>
        )}

        <HStack gap={2}>
          <Button
            variant="surface"
            colorPalette={palette}
            disabled={item.status !== "done"}
            onClick={() => onDownload(item.id)}
            flex="1"
          >
            <FaDownload />
            {"Download"}
          </Button>
          <IconButton
            aria-label={`Remove ${item.fileName}`}
            variant="subtle"
            color="fg.error"
            disabled={item.status === "converting" || item.status === "queued"}
            onClick={() => onRemove(item.id)}
          >
            <FaTrash />
          </IconButton>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ImageConverterBatchItem;

import type {
  AppIconPlatformKey,
  AppIconPlatformSelection,
} from "@/components/Tools/AppIconGenerator/appIconGeneratorTypes";
import { Tooltip } from "@/components/ui/tooltip";
import { useColorPalette } from "@/contexts/useColorPalette";
import { appIconGeneratorPlatformCardData } from "@/data/tools/appIconGenerator/appIconGeneratorData";
import {
  Badge,
  Box,
  Checkbox,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaCircleInfo } from "react-icons/fa6";

type Props = {
  selection: AppIconPlatformSelection;
  onPlatformChange: (key: AppIconPlatformKey, checked: boolean) => void;
};

type OptionRowProps = {
  checked: boolean;
  count: number;
  description: string;
  icon: React.ElementType;
  label: string;
  sizeGuide?: string;
  testId: string;
  onCheckedChange: (checked: boolean) => void;
};

const OptionRow: React.FC<OptionRowProps> = ({
  checked,
  count,
  description,
  icon,
  label,
  sizeGuide,
  onCheckedChange,
  testId,
}) => {
  const { palette } = useColorPalette();
  return (
    <Checkbox.Root
      checked={checked}
      onCheckedChange={(details) => onCheckedChange(!!details.checked)}
      width="full"
      data-testid={testId}
      colorPalette={palette}
    >
      <HStack
        w="full"
        justify="space-between"
        align="flex-start"
        borderWidth="1px"
        borderRadius="xl"
        px={4}
        py={3}
        bg={checked ? "bg.panel" : "transparent"}
        cursor="pointer"
      >
        <HStack align="flex-start" gap={3}>
          <Icon as={icon} mt="1" />
          <Checkbox.HiddenInput />
          <Checkbox.Control mt="1" />
          <VStack align="flex-start" gap={0}>
            <Checkbox.Label fontWeight="medium">{label}</Checkbox.Label>
            <HStack gap={1.5}>
              <Text color="fg.muted" textStyle="sm">
                {description}
              </Text>
              {sizeGuide ? (
                <Tooltip
                  content={sizeGuide}
                  positioning={{ placement: "top" }}
                  openDelay={150}
                  closeDelay={100}
                >
                  <Box
                    as="button"
                    color="fg.subtle"
                    aria-label={`${label} size guide`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Icon as={FaCircleInfo} boxSize={3.5} />
                  </Box>
                </Tooltip>
              ) : null}
            </HStack>
          </VStack>
        </HStack>
        <Badge variant="subtle" colorPalette={palette}>{`${count} files`}</Badge>
      </HStack>
    </Checkbox.Root>
  );
};

/**
 * iOS / Apple platform checkboxes only.
 * Title, subtitle, and Android section have been removed —
 * they are handled by the hero and AndroidIconGenerator respectively.
 */
const AppIconGeneratorPlatformOptions: React.FC<Props> = ({
  selection,
  onPlatformChange,
}) => {
  return (
    <VStack align="stretch" gap={4}>
      <Stack gap={3}>
        {appIconGeneratorPlatformCardData.apple.items.map((item) => (
          <OptionRow
            key={item.key}
            checked={selection[item.key as AppIconPlatformKey]}
            count={item.count}
            description={item.description}
            icon={item.icon}
            label={item.label}
            sizeGuide={item.sizeGuide}
            testId={`platform-option-${item.key}`}
            onCheckedChange={(checked) =>
              onPlatformChange(item.key as AppIconPlatformKey, checked)
            }
          />
        ))}
      </Stack>
      <Text color="fg.muted" textStyle="sm">
        {"For best results use square icons without rounded corners."}
      </Text>
    </VStack>
  );
};

export default AppIconGeneratorPlatformOptions;

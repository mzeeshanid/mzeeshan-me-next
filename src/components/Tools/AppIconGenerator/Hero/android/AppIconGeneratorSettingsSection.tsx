import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

export interface AppIconGeneratorSettingsItem {
  label: string;
  sublabel?: string;
  control: React.ReactNode;
  hidden?: boolean;
  /** Renders label above and control below (full card width), instead of label-left / control-right */
  fullWidth?: boolean;
}

export interface AppIconGeneratorSettingsSectionData {
  title?: string;
  items: AppIconGeneratorSettingsItem[];
  footer?: string;
}

interface Props {
  sections: AppIconGeneratorSettingsSectionData[];
}

/**
 * Renders iOS-style grouped settings sections.
 * Each section has an optional uppercase title above a rounded card,
 * with rows separated by thin dividers. Label on the left, control on the right.
 */
const AppIconGeneratorSettingsSection: React.FC<Props> = ({ sections }) => {
  return (
    <VStack align="stretch" gap={5}>
      {sections.map((section, sIdx) => {
        const visibleItems = section.items.filter((i) => !i.hidden);
        if (visibleItems.length === 0) return null;
        return (
          <VStack key={sIdx} align="stretch" gap={1.5}>
            {section.title && (
              <Text
                fontSize="xs"
                fontWeight="600"
                color="fg.subtle"
                textTransform="uppercase"
                letterSpacing="0.06em"
                px={1}
              >
                {section.title}
              </Text>
            )}
            <Box borderWidth="1px" borderRadius="xl" overflow="hidden">
              {visibleItems.map((item, iIdx) => (
                <React.Fragment key={iIdx}>
                  {iIdx > 0 && <Box h="1px" bg="border.muted" />}
                  {item.fullWidth ? (
                    <VStack px={4} py={3} align="stretch" gap={2} bg="bg.panel">
                      <VStack align="start" gap={0}>
                        <Text fontSize="sm" fontWeight="medium">
                          {item.label}
                        </Text>
                        {item.sublabel && (
                          <Text fontSize="xs" color="fg.muted">
                            {item.sublabel}
                          </Text>
                        )}
                      </VStack>
                      <Box>{item.control}</Box>
                    </VStack>
                  ) : (
                    <HStack
                      px={4}
                      py={3}
                      justify="space-between"
                      align="center"
                      gap={4}
                      bg="bg.panel"
                    >
                      <VStack align="start" gap={0} flex={1} minW={0}>
                        <Text fontSize="sm" fontWeight="medium">
                          {item.label}
                        </Text>
                        {item.sublabel && (
                          <Text fontSize="xs" color="fg.muted" lineClamp={2}>
                            {item.sublabel}
                          </Text>
                        )}
                      </VStack>
                      <Box flexShrink={0}>{item.control}</Box>
                    </HStack>
                  )}
                </React.Fragment>
              ))}
            </Box>
            {section.footer && (
              <Text fontSize="xs" color="fg.subtle" px={1}>
                {section.footer}
              </Text>
            )}
          </VStack>
        );
      })}
    </VStack>
  );
};

export default AppIconGeneratorSettingsSection;

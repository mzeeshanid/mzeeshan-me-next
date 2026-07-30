import { Button, Text, VStack } from "@chakra-ui/react";
import React from "react";

export interface SectionItem {
  key: string | null;
  label: string;
  count: number;
}

interface Props {
  heading?: string;
  items: SectionItem[];
  selected: string | null;
  onSelect: (key: string | null) => void;
  palette: string;
}

// Desktop-only sticky rail — stays put while the (much taller) card listing
// next to it scrolls past, then scrolls away normally once that row ends,
// matching a sectioned table view. Shared by the variant listing (browse by
// section) and the extension listing (browse by category).
const SectionSidebar: React.FC<Props> = ({
  heading = "Browse by section",
  items,
  selected,
  onSelect,
  palette,
}) => {
  return (
    <VStack
      align="stretch"
      gap={0.5}
      position="sticky"
      top="calc(var(--navbar-height, 93px) + 24px)"
      maxH="calc(100vh - var(--navbar-height, 93px) - 48px)"
      overflowY="auto"
    >
      <Text
        fontSize="xs"
        fontWeight="semibold"
        color="fg.muted"
        textTransform="uppercase"
        letterSpacing="wider"
        px={3}
        pb={2}
      >
        {heading}
      </Text>
      {items.map((item) => {
        const active = selected === item.key;
        return (
          <Button
            key={item.key ?? "__all__"}
            variant="ghost"
            justifyContent="space-between"
            w="full"
            borderRadius="lg"
            px={3}
            fontWeight={active ? "semibold" : "normal"}
            bg={active ? `${palette}.subtle` : "transparent"}
            color={active ? `${palette}.fg` : "fg.muted"}
            _hover={{ bg: active ? `${palette}.subtle` : "bg.subtle" }}
            onClick={() => onSelect(item.key)}
          >
            <Text fontSize="sm" truncate>
              {item.label}
            </Text>
            <Text fontSize="xs" color={active ? `${palette}.fg` : "fg.subtle"}>
              {item.count}
            </Text>
          </Button>
        );
      })}
    </VStack>
  );
};

export default SectionSidebar;

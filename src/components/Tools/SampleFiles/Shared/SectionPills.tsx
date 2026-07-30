import { Button, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { SectionItem } from "./SectionSidebar";

interface Props {
  items: SectionItem[];
  selected: string | null;
  onSelect: (key: string | null) => void;
  palette: string;
}

// Mobile stand-in for SectionSidebar — a horizontally scrollable pill bar,
// since a sticky side rail has no room on small screens.
const SectionPills: React.FC<Props> = ({
  items,
  selected,
  onSelect,
  palette,
}) => {
  return (
    <HStack
      gap={2}
      overflowX="auto"
      pb={1}
      css={{
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {items.map((item) => {
        const active = selected === item.key;
        return (
          <Button
            key={item.key ?? "__all__"}
            size="xs"
            variant={active ? "solid" : "outline"}
            colorPalette={active ? palette : "gray"}
            borderRadius="full"
            flexShrink={0}
            onClick={() => onSelect(item.key)}
            px={3}
            fontWeight={active ? "semibold" : "normal"}
            gap={1.5}
          >
            {item.label}
            <Text as="span" fontSize="2xs" opacity={0.7}>
              {item.count}
            </Text>
          </Button>
        );
      })}
    </HStack>
  );
};

export default SectionPills;

import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { LuInfo } from "react-icons/lu";

interface SharedNoteBannerProps {
  note: string;
  palette: string;
}

// When 2+ variants in a group share identical note text, this collapses
// them into one shared banner instead of repeating the same tooltip on
// every card.
const SharedNoteBanner: React.FC<SharedNoteBannerProps> = ({
  note,
  palette,
}) => (
  <Box
    mb={3}
    px={3}
    py={2}
    borderRadius="lg"
    bg={`${palette}.subtle`}
    display="flex"
    gap={2}
    alignItems="flex-start"
  >
    <LuInfo size={14} style={{ marginTop: 2, flexShrink: 0 }} />
    <Text fontSize="xs" color="fg.muted">
      {note}
    </Text>
  </Box>
);

export default SharedNoteBanner;

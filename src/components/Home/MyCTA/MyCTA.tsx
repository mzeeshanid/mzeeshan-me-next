import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import { Box, Button, Link, Tag, VStack } from "@chakra-ui/react";
import React from "react";

type MyCTAProps = {};

const MyCTA: React.FC<MyCTAProps> = (props: MyCTAProps) => {
  const { palette } = useColorPalette();
  return (
    <Box as={"section"}>
      <VStack gap={6}>
        <Tag.Root
          px={4}
          py={2}
          size={"lg"}
          rounded={"full"}
          variant={"surface"}
          colorPalette={palette}
        >
          <Tag.Label>{"Sound's interesting"}</Tag.Label>
        </Tag.Root>
        <SectionHeader
          headline={"Ready to grow your business?"}
          description={
            "Let's connect today to discuss how I can help you achieve your goals."
          }
          textAlign={"center"}
        />
        <Link href="/contact">
          <Button variant={"solid"} colorPalette={palette} size={"lg"}>
            {"Contact Me"}
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default MyCTA;

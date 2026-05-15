import { TypewriterHighlight } from "@/components/TypewriterHighlight/TypewriterHighlight";
import { css, cx } from "styled-system/css";
import { paletteCva, useColorPalette, type PaletteCvaKey } from "@/contexts/useColorPalette";
import {
  Box,
  Container,
  HStack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import { FC } from "react";
import { GrSwift } from "react-icons/gr";
import { IoIosPhonePortrait } from "react-icons/io";

export const MyAppsHero: FC = () => {
  const { palette } = useColorPalette();
  return (
    <Box as={"section"}>
      <VStack gap={6}>
        <Tag.Root colorPalette={palette}>
          <Tag.Label>
            <HStack>
              <DeferredIcon icon={IoIosPhonePortrait} />
              {"Native Apps"}
              <DeferredIcon icon={GrSwift} />
            </HStack>
          </Tag.Label>
        </Tag.Root>
        <Container
          fontWeight={"medium"}
          fontSize={{ base: "2xl", md: "3xl", lg: "5xl" }}
          textAlign={"center"}
          lineHeight={"shorter"}
        >
          {"Apps Crafted with "}
          <TypewriterHighlight
            words={["Precision", "Performance", "Elegance"]}
            highlightClassName={cx(
              paletteCva({ palette: palette as PaletteCvaKey }),
              css({ px: "0.5", bg: "colorPalette.subtle", color: "colorPalette.fg", fontWeight: "bold", fontSize: { base: "2xl", md: "3xl", lg: "5xl" } }),
            )}
          />
          {"."}
        </Container>
        <Text
          textAlign={"center"}
          fontSize={{ base: "lg", md: "xl" }}
          color={"fg.muted"}
        >
          {
            "Explore a collection of thoughtfully designed native applications focused on performance, usability, and elegant user experiences. Each app is built to solve real problems with clean architecture and modern practices."
          }
        </Text>
        <Text
          fontSize={"4xl"}
          fontWeight={"bold"}
          textAlign={"center"}
          lineHeight={"shorter"}
        ></Text>
      </VStack>
    </Box>
  );
};

export default MyAppsHero;

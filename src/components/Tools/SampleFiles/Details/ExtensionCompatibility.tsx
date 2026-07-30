import { ExtensionCompatibilityData as ExtensionCompatibilityData } from "@/data/tools/sampleFiles/sampleFilesExtensionDetails";
import {
  Box,
  Center,
  GridItem,
  Icon,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { cardStyle } from "@/components/Tools/SampleFiles/Shared/ExtensionCard";
import { useColorPalette } from "@/contexts/useColorPalette";
import { BiWorld } from "react-icons/bi";
import { FaAndroid, FaApple, FaLinux, FaWindows } from "react-icons/fa6";
import { GiPlatform } from "react-icons/gi";

interface Props {
  data: ExtensionCompatibilityData;
}

// Platform names carry an optional parenthetical, e.g. "Windows (native
// WordPad/Word support)" — split it out so it can render as a subtitle.
function splitPlatformName(name: string): { main: string; subtitle?: string } {
  const match = name.match(/^(.*?)\s*(\(.*\))\s*$/);
  if (!match) return { main: name };
  return { main: match[1], subtitle: match[2] };
}

const ExtensionCompatibility: React.FC<Props> = ({ data }) => {
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <Center>
        <SectionHeader
          tagline={"Compatibility"}
          headline={data.title}
          description={
            "This extension is compatible with the following platforms."
          }
          textAlign={"center"}
        />
      </Center>
      <Spacer p={4} />
      <SimpleGrid
        w={"full"}
        columns={{ base: 2, md: 3, lg: data.platforms.length }}
        gap={4}
      >
        {data.platforms.map((platform, idx) => {
          const { main, subtitle } = splitPlatformName(platform.name);

          return (
            <GridItem key={idx} h={"full"}>
              <Box
                {...cardStyle}
                h={"full"}
                p={4}
                transition="all 0.15s ease"
                _hover={{
                  borderColor: `${palette}.400`,
                  transform: "translateY(-2px)",
                }}
              >
                <VStack>
                  <Icon
                    as={platformIcons(platform.type)}
                    boxSize={{ base: 10, md: 12 }}
                    color={`${palette}.fg`}
                  />
                  <VStack gap={0.5}>
                    <Text textAlign={"center"} fontWeight="medium">
                      {main}
                    </Text>
                    {subtitle && (
                      <Text
                        textAlign={"center"}
                        fontSize="xs"
                        color="fg.muted"
                      >
                        {subtitle}
                      </Text>
                    )}
                  </VStack>
                </VStack>
              </Box>
            </GridItem>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

const platformIcons = (
  type: "windows" | "mac" | "linux" | "android" | "iOS" | "web" | string,
) => {
  switch (type) {
    case "windows":
      return FaWindows;
    case "mac":
      return FaApple;
    case "linux":
      return FaLinux;
    case "android":
      return FaAndroid;
    case "iOS":
      return FaApple;
    case "web":
      return BiWorld;
    default:
      return GiPlatform;
  }
};

export default ExtensionCompatibility;

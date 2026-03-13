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
import { useColorPalette } from "@/contexts/useColorPalette";
import { BiWorld } from "react-icons/bi";
import {
  FaAndroid,
  FaApple,
  FaLinux,
  FaWindows,
} from "react-icons/fa6";
import { GiPlatform } from "react-icons/gi";

interface Props {
  data: ExtensionCompatibilityData;
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
      <Center>
        <SimpleGrid w={"full"} minChildWidth={"xs"} gap={4}>
          {data.platforms.map((platform, idx) => (
            <GridItem key={idx} h={"full"}>
              <Box bg={"bg.subtle"} p={4} borderRadius={"md"} h={"full"}>
                <VStack>
                  <Icon
                    as={platformIcons(platform.type)}
                    boxSize={{ base: 12, md: 16 }}
                    color={`${palette}.fg`}
                  />
                  <Text textAlign={"center"}>{platform.name}</Text>
                </VStack>
              </Box>
            </GridItem>
          ))}
        </SimpleGrid>
      </Center>
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

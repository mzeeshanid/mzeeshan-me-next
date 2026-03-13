import { useColorPalette } from "@/contexts/useColorPalette";
import { driveDirectData } from "@/data/tools/driveDirect/driveDirectData";
import {
  Box,
  Center,
  Heading,
  Stack,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import DriveDirectSingleLink from "./DriveDirectSingleLink";
import DriveDirectMultipleLinks from "./DriveDirectMultipleLinks";

type Props = {
  onDirectLinkGenerated: (directLink: string[]) => void;
};

const DriveDirectHero: React.FC<Props> = (props: Props) => {
  const { hero } = driveDirectData();
  const { palette } = useColorPalette();
  return (
    <Box as="section">
      <Stack gap={12} direction={{ base: "column-reverse", md: "row" }}>
        <Stack gap={6} w={{ base: "full", md: "50%" }}>
          {/* Title */}
          <Stack gap={2}>
            <Heading as="h1" size={{ base: "2xl", md: "4xl" }}>
              {hero.heroTitle}
            </Heading>
            <Text color="fg.subtle">{hero.heroDesc}</Text>
          </Stack>

          {/* Tool Card */}
          <Box>
            <Tabs.Root
              variant="enclosed"
              fitted
              defaultValue={"tab-1"}
              colorPalette={palette}
            >
              <Tabs.List>
                <Tabs.Trigger value="tab-1">{"Single"}</Tabs.Trigger>
                <Tabs.Trigger value="tab-2">{"Multiple"}</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="tab-1">
                <DriveDirectSingleLink
                  onDirectLinkGenerated={(directLink) => {
                    props.onDirectLinkGenerated([directLink]);
                  }}
                />
              </Tabs.Content>
              <Tabs.Content value="tab-2">
                <DriveDirectMultipleLinks
                  onDirectLinkGenerated={(links: string[]) => {
                    props.onDirectLinkGenerated(links);
                  }}
                />
              </Tabs.Content>
            </Tabs.Root>
            {/* Foot Note */}
            <Text mt={4} fontSize="sm" color="fg.muted" textAlign="center">
              {hero.heroFootNote}
            </Text>
          </Box>
        </Stack>
        <Box w={{ base: "full", md: "50%" }}>
          <Center bg="bg.subtle" borderRadius={"2xl"}>
            <Image
              src={hero.heroImage.src}
              alt={hero.heroImage.alt}
              placeholder="blur"
              blurDataURL={hero.heroImage.src}
              width={hero.heroImage.width}
              height={hero.heroImage.height}
            />
          </Center>
        </Box>
      </Stack>
    </Box>
  );
};

export default DriveDirectHero;

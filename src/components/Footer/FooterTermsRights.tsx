import {
  HStack,
  Icon,
  Link,
  Stack,
  StackSeparator,
  Text,
} from "@chakra-ui/react";
import React from "react";
import footerData from "../../data/footer/footerData";
import { useColorPalette } from "@/contexts/useColorPalette";

type FooterTermsRightsProps = {};

const FooterTermsRights = (props: FooterTermsRightsProps) => {
  const { rightsReserved, bottomLinks, nextJs, chakraUi } = footerData();
  const { palette } = useColorPalette();
  return (
    <Stack
      direction={{ base: "column-reverse", md: "row" }}
      justify={"center"}
      gap={4}
      pl={4}
      pr={4}
      pb={4}
      mt={{ base: 0, md: 4 }}
      mb={{ base: 0, md: 4 }}
      separator={<StackSeparator />}
    >
      <Text textAlign="center">{rightsReserved}</Text>
      <HStack gap={4} flexWrap="wrap" justify="center">
        {bottomLinks.map((link, idx) => (
          <Link key={idx} href={link.url} variant={"underline"}>
            {link.label}
          </Link>
        ))}
      </HStack>
      <HStack gap={2} flexWrap="wrap" justify="center">
        <Text>{"Powered by"}</Text>
        <Link href={nextJs.url}>
          <Icon as={nextJs.icon} color={`${palette}.fg`} boxSize={5} />
        </Link>
        <Text>{"&"}</Text>
        <Link href={chakraUi.url}>
          <Icon as={chakraUi.icon} color={`${palette}.fg`} boxSize={4} />
        </Link>
      </HStack>
    </Stack>
  );
};

export default FooterTermsRights;

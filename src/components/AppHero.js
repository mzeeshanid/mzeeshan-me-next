import {
  Box,
  Button,
  Circle,
  Heading,
  Link,
  Stack,
  Text,
  theme,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

import { SiFiverr, SiUpwork } from "react-icons/si";
import profileImage from "../../public/assets/profile_pic.jpeg";

function AppHero({ as = "h2" }) {
  const headingBPValue = useBreakpointValue({
    base: "2xl",
    lg: "4xl",
  });

  const textBPValue = useBreakpointValue({
    base: "lg",
    md: "xl",
    lg: "2xl",
  });

  const paddingBPValue = useBreakpointValue({
    base: 5,
    md: 10,
    lg: 20,
  });

  const spacingBPValue = useBreakpointValue({
    base: 2,
    md: 4,
    lg: 6,
  });

  const profileImageBPValue = useBreakpointValue({
    base: 140,
    md: 180,
    lg: 220,
  });

  const actionButtonBPValue = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
  });

  const actionButtonSpacingBPValue = useBreakpointValue({
    base: "2",
    lg: "4",
  });

  const actionStackDirectionBPValue = useBreakpointValue({
    base: "column",
    lg: "row",
  });

  return (
    <Box py={paddingBPValue} bg={theme.colors.gray[50]}>
      <VStack spacing={spacingBPValue}>
        <Circle overflow="hidden">
          <Image
            src={profileImage}
            placeholder={"blur"}
            alt="Profile Image"
            width={profileImageBPValue}
            height={profileImageBPValue}
          />
        </Circle>
        <Text
          color={theme.colors.gray[500]}
          as={"b"}
          fontSize={textBPValue}
          textAlign="center"
        >
          MUHAMMAD ZEESHAN
        </Text>
        <Heading size={headingBPValue} textAlign="center">
          Senior iOS Developer
        </Heading>
        <Text as={as} fontSize={textBPValue} textAlign="center">
          Code with Precision, Create with Passion.
        </Text>
        <Stack
          align={"stretch"}
          spacing={actionButtonSpacingBPValue}
          direction={actionStackDirectionBPValue}
        >
          <Link isExternal href={"https://www.fiverr.com/s/w52zEo"}>
            <Button
              width={"100%"}
              leftIcon={<SiFiverr />}
              size={actionButtonBPValue}
              colorScheme={"green"}
            >
              <Text>Hire me @ </Text>
              <Text as="b">Fiverr</Text>
            </Button>
          </Link>
          <Link isExternal href={"https://www.upwork.com/fl/mzeeshanid"}>
            <Button
              width={"100%"}
              leftIcon={<SiUpwork />}
              size={actionButtonBPValue}
              colorScheme={"green"}
              variant={"outline"}
            >
              <Text>Hire me @ </Text>
              <Text as="b">Upwork</Text>
            </Button>
          </Link>
        </Stack>
      </VStack>
    </Box>
  );
}

export default AppHero;

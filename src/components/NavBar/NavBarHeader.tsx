import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export type NavBarHeaderProps = {
  title: string;
  subtitle: string;
  icon: string;
  alt: string;
  rounded?: boolean;
};

const NavBarHeader: React.FC<NavBarHeaderProps> = (
  props: NavBarHeaderProps,
) => {
  return (
    <HStack gap={4} justify={{ base: "center", md: "flex-start" }}>
      <Box
        borderRadius="md"
        rounded={props.rounded ? "full" : undefined}
        overflow="hidden"
      >
        <Image
          width={60}
          height={60}
          src={props.icon}
          alt={props.alt}
          style={{ objectFit: "cover" }}
          priority
          sizes="60px"
        />
      </Box>
      <VStack align={"flex-start"} gap={0}>
        <Text fontWeight="bold" fontSize="lg">
          {props.title}
        </Text>
        <Text color={"fg.muted"}>{props.subtitle}</Text>
      </VStack>
    </HStack>
  );
};

export default NavBarHeader;

import { useColorPalette } from "@/contexts/useColorPalette";
import { DriveDirectUsageItemModel } from "@/data/tools/driveDirect/driveDirectUsageData";
import {
  Box,
  Button,
  Heading,
  Icon,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  item: DriveDirectUsageItemModel;
};

const DriveDirectUsageItem: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();
  const { title, desc, link, icon } = props.item;

  return (
    <Box>
      <VStack align={"start"}>
        <Icon
          as={icon}
          size={{ base: "xl", md: "2xl" }}
          color={`${palette}.focusRing`}
        />
        <Heading>{title}</Heading>
        <Text color={"fg.muted"}>{desc}</Text>
        <Link href={link}>
          <Button colorPalette={palette}>{"Download"}</Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default DriveDirectUsageItem;

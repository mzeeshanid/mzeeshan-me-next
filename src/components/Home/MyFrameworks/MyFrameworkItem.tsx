import { useColorPalette } from "@/contexts/useColorPalette";
import { Icon, Link, LinkBox, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

type MyFrameworkItemProps = {
  title: string;
  description: string;
  link: string;
  icon: IconType;
};

const MyFrameworkItem: React.FC<MyFrameworkItemProps> = (
  props: MyFrameworkItemProps
) => {
  const { palette } = useColorPalette();
  const { title, description, icon, link } = props;
  return (
    <LinkBox>
      <Link href={link}>
        <VStack>
          <Icon as={icon} boxSize={12} color={`${palette}.fg`} />
          <Text
            fontWeight={"semibold"}
            fontSize={"lg"}
            textAlign={"center"}
            color={`${palette}.fg`}
          >
            {title}
          </Text>
          <Text textAlign={"center"} color="fg.muted">
            {description}
          </Text>
        </VStack>
      </Link>
    </LinkBox>
  );
};

export default MyFrameworkItem;

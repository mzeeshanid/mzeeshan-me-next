import { BasicImageDataModel } from "@/data/basicImage/basicImageDataModel";
import { Box, Card, HStack, Link, LinkBox, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

type MyAppItemProps = {
  title: string;
  caption: string;
  detail: string;
  url: string;
  icon: BasicImageDataModel;
};

const MyAppItem = (props: MyAppItemProps) => {
  const { title, caption, icon, url } = props;
  return (
    <Card.Root bg="bg.subtle" borderWidth={0}>
      <Card.Body>
        <LinkBox>
          <Link href={url}>
            <HStack align={"flex-start"} gap={4}>
              <Box w="64px" h="64px" flexShrink={0} bg="bg.muted" rounded="xl" overflow="hidden">
                <Image
                  alt={icon.alt}
                  src={icon.src}
                  placeholder="blur"
                  width={64}
                  height={64}
                  sizes="64px"
                />
              </Box>
              <VStack align={"flex-start"} gap={0}>
                <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight={"bold"}>
                  {title}
                </Text>
                <Text color={"fg.muted"}>{caption}</Text>
              </VStack>
            </HStack>
          </Link>
        </LinkBox>
      </Card.Body>
    </Card.Root>
  );
};

export default MyAppItem;

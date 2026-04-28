import { MyToolDataModel } from "@/data/home/myToolsData";
import { Box, Card, HStack, Link, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

type Props = {
  tool: MyToolDataModel;
};

const MyToolListingItem: React.FC<Props> = (props: Props) => {
  const { tool } = props;
  return (
    <Link href={tool.url} w={"full"} h="full">
      <Card.Root bg="bg.subtle" w={"full"} h="full">
        <Card.Header>
          <HStack gap={4}>
            <Box w="54px" h="54px" flexShrink={0} bg="bg.muted" rounded="lg" overflow="hidden">
              <Image
                src={tool.icon.src}
                placeholder="blur"
                alt={`${tool.title} icon`}
                width={54}
                height={54}
                sizes="54px"
              />
            </Box>
            <VStack align="start" gap={0}>
              <Text fontWeight={"bold"} fontSize={"lg"}>
                {tool.title}
              </Text>
              <Text fontSize={"sm"} color={"fg.muted"}>
                {tool.caption}
              </Text>
            </VStack>
          </HStack>
        </Card.Header>
        <Card.Body>
          <Text>{tool.detail}</Text>
        </Card.Body>
      </Card.Root>
    </Link>
  );
};

export default MyToolListingItem;

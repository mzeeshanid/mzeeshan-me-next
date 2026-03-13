import { BasicImageDataModel } from "@/data/basicImage/basicImageDataModel";
import { Card, HStack, Link, LinkBox, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

type MyAppItemProps = {
  title: string;
  caption: string;
  detail: string;
  url: string;
  icon: BasicImageDataModel;
};

const MyAppItem = (props: MyAppItemProps) => {
  const { title, caption, detail, icon, url } = props;
  return (
    <Card.Root bg="bg.subtle" borderWidth={0}>
      <Card.Body>
        <LinkBox>
          <Link href={url}>
            <HStack align={"flex-start"} gap={4}>
              <Image
                alt={icon.alt}
                src={icon.src}
                blurDataURL={icon.src}
                placeholder="blur"
                width={64}
                height={64}
              />
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

import { MyApp } from "@/data/home/myAppsData";
import { Card, HStack, Link, Spacer, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

type Props = {
  app: MyApp;
};

const MyAppsListingItem: React.FC<Props> = (props) => {
  const { app } = props;
  return (
    <Link href={app.url}>
      <Card.Root bg="bg.subtle">
        <Card.Header>
          <HStack gap={4}>
            <Image
              src={app.icon.src}
              blurDataURL={app.icon.src}
              placeholder="blur"
              alt={`${app.title} icon`}
              width={54}
              height={54}
            />
            <VStack align="start" gap={0}>
              <Text fontWeight={"bold"} fontSize={"lg"}>
                {app.title}
              </Text>
              <Text fontSize={"sm"} color={"fg.muted"}>
                {app.caption}
              </Text>
            </VStack>
          </HStack>
        </Card.Header>
        <Card.Body>
          <Text>{app.detail}</Text>
        </Card.Body>
      </Card.Root>
    </Link>
  );
};

export default MyAppsListingItem;

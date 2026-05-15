import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import myClientReviewsData from "@/data/home/myClientReviewsData";
import { Card, Container, GridItem, SimpleGrid, VStack } from "@chakra-ui/react";
import React from "react";
import MyClientStatItem from "./MyClientStatItem";

type MyClientStatsProps = {};

const MyClientStats: React.FC<MyClientStatsProps> = (props) => {
  const { stats, statsTitle } = myClientReviewsData();
  return (
    <Card.Root>
      <Card.Body>
        <Container py={8}>
          <VStack gap={12}>
            <SectionHeader textAlign="center" headline={statsTitle} />
            <SimpleGrid columns={{ base: 2, lg: 4 }} gap={4}>
              {stats.map((item, idx) => (
                <GridItem key={idx}>
                  <MyClientStatItem idx={idx} item={item} />
                </GridItem>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Card.Body>
    </Card.Root>
  );
};

export default MyClientStats;

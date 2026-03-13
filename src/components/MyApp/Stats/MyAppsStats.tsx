import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { MyAppStatsDataModel } from "@/data/myApps/myAppStatsData";
import {
  Box,
  Card,
  Container,
  GridItem,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import MAppStatItem from "./MAppStatItem";

type Props = {
  statsData: MyAppStatsDataModel;
};

const MyAppStats: React.FC<Props> = (props: Props) => {
  const { statsData } = props;
  return (
    <Box as="section">
      <Card.Root>
        <Card.Body>
          <Container py={2}>
            <VStack gap={8}>
              <SectionHeader textAlign="center" headline={"App Stats"} />
              <SimpleGrid w="full" minChildWidth={200} gap={4}>
                {statsData.stats.map((item, idx) => (
                  <GridItem key={idx}>
                    <MAppStatItem idx={idx} item={item} />
                  </GridItem>
                ))}
              </SimpleGrid>
            </VStack>
          </Container>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default MyAppStats;

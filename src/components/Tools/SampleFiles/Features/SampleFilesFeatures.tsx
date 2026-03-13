import React from "react";
import {
  Badge,
  Box,
  Center,
  GridItem,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { sampleFilesStatsData } from "@/data/tools/sampleFiles/statsData";
import SampleFilesFeatureItem from "./SampleFilesFeatureItem";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

type Props = {};

const SampleFilesFeatures: React.FC<Props> = (props: Props) => {
  const data = sampleFilesStatsData;

  return (
    <Box as={"section"}>
      <Center>
        <SectionHeader
          textAlign={"center"}
          tagline={data.badge}
          headline={data.heading}
          description={data.details}
        />
      </Center>
      <Spacer p={4} />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
        {data.features.map((feature, index) => (
          <GridItem key={index}>
            <SampleFilesFeatureItem feature={feature} />
            {/* <MyPerformanceStatItem
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            /> */}
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
    // <Box as="section" py={12} px={{ base: 4, md: 8 }}>
    //   <VStack gap={8} alignItems="center">
    //     <VStack gap={4} textAlign="center" maxW="2xl">
    //       <Badge colorPalette="blue" variant="solid" size="lg">
    //         {data.badge}
    //       </Badge>
    //       <Heading as="h2" size="2xl">
    //         {data.heading}
    //       </Heading>
    //       <Text fontSize="lg" color="gray.600">
    //         {data.details}
    //       </Text>
    //     </VStack>

    //     <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
    //       {data.features.map((feature, index) => (
    //         <SampleFilesFeatureItem key={index} feature={feature} />
    //       ))}
    //     </SimpleGrid>
    //   </VStack>
    // </Box>
  );
};

export default SampleFilesFeatures;

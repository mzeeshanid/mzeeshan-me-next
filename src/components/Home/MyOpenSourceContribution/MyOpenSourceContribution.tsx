import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import myContributionData from "@/data/home/myContributionData";
import {
  Box,
  Grid,
  GridItem,
  SimpleGrid,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import MyOpenSourceContributionItem from "./MyOpenSourceContributionItem";

type MyOpenSourceContributionProps = {};

const MyOpenSourceContribution: React.FC<
  MyOpenSourceContributionProps
> = () => {
  const contributions = myContributionData();
  return (
    <Stack as="section" align={"center"} gap={4}>
      <SectionHeader textAlign="center" headline="Open Source Contributions" />
      <Spacer />
      <SimpleGrid w="full" columns={{ base: 1, lg: 2 }} gap={4}>
        {contributions.map((contribution, idx) => (
          <GridItem key={idx}>
            <MyOpenSourceContributionItem contribution={contribution} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default MyOpenSourceContribution;

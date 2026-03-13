import { useColorPalette } from "@/contexts/useColorPalette";
import { Heading, RatingGroup, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  title: string;
  avgRating: number;
  totalReviews: number;
};

const MyAppReviewsHeader: React.FC<Props> = (props: Props) => {
  const { title, avgRating, totalReviews } = props;
  const { palette } = useColorPalette();
  return (
    <VStack
      align={"flex-start"}
      gap={4}
      pl={{ base: 4, md: 8 }}
      pr={{ base: 4, md: 8 }}
    >
      <Heading as="h2" size={"2xl"} minW={"180px"}>
        {title}
      </Heading>
      <Text fontWeight={"bold"} fontSize={{ base: "4xl", md: "6xl" }}>
        {avgRating.toFixed(0)}/5
      </Text>
      <Stack direction={{ base: "row", md: "column" }}>
        <RatingGroup.Root
          count={5}
          defaultValue={avgRating}
          size="md"
          colorPalette={palette}
          readOnly
          aria-label={"Average client rating"}
        >
          <RatingGroup.HiddenInput />
          <RatingGroup.Control />
        </RatingGroup.Root>
        <Text
          fontSize={"lg"}
          textDecoration={"underline"}
          textDecorationThickness={0.25}
          textUnderlineOffset={4}
          color={"fg.subtle"}
        >
          {`${totalReviews} + reviews`}
        </Text>
      </Stack>
    </VStack>
  );
};

export default MyAppReviewsHeader;

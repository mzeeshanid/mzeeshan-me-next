import { MyAppReviewDataModel } from "@/data/myApps/myAppReviewsData";
import { Box, GridItem, SimpleGrid, Stack } from "@chakra-ui/react";
import React from "react";
import MyAppReviewItem from "./MyAppReviewItem";
import MyAppReviewsHeader from "./MyAppReviewsHeader";

type Props = {
  reviewsData: MyAppReviewDataModel;
};

const MyAppReviews: React.FC<Props> = (props: Props) => {
  const { title, reviews } = props.reviewsData;

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <Box as="section">
      <Stack direction={{ base: "column", md: "row" }} gap={4}>
        <MyAppReviewsHeader
          avgRating={avgRating}
          totalReviews={reviews.length}
          title={title}
        />
        <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} gap={4}>
          {reviews.map((review, idx) => (
            <GridItem
              key={idx}
              h="full"
              maxW={{ base: "full", md: "full", lg: "md" }}
            >
              <MyAppReviewItem reviewItem={review} />
            </GridItem>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default MyAppReviews;

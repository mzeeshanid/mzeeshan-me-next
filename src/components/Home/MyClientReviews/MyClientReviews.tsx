import myClientReviewsData from "@/data/home/myClientReviewsData";
import { Box, GridItem, SimpleGrid, Spacer, Stack } from "@chakra-ui/react";
import MyClientReviewItem from "./MyClientReviewItem";
import MyClientReviewsHeader from "./MyClientReviewsHeader";
import MyClientStats from "./MyClientStats";

const MyClientReviews: React.FC = () => {
  const { title, reviews } = myClientReviewsData();

  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <Box as="section">
      <MyClientStats />
      <Spacer p={4} />
      <Stack direction={{ base: "column", md: "row" }} gap={4}>
        <MyClientReviewsHeader
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
              <MyClientReviewItem {...review} />
            </GridItem>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default MyClientReviews;

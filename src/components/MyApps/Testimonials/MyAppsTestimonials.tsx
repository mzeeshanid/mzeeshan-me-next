import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { myAppsTestimonialData } from "@/data/myApps/myAppTestimonialData";
import { mzFileManageReviewsData } from "@/data/myApps/mzFileManage/mzFileManageReviewsData";
import { Box, Carousel, IconButton, Spacer } from "@chakra-ui/react";
import React from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import MyAppsTestimonialItem from "./MyAppsTestimonialItem";

type Props = {};

const MyAppsTestimonials: React.FC<Props> = (props: Props) => {
  const testimonialsData = myAppsTestimonialData;
  return (
    <Box as={"section"}>
      <SectionHeader
        tagline={testimonialsData.badge}
        headline={testimonialsData.title}
        description={testimonialsData.details}
      />
      <Spacer p={4} />
      <Carousel.Root
        slideCount={testimonialsData.testimonials.length}
        maxW="6xl"
        mx="auto"
        gap="4"
      >
        <Carousel.Control justifyContent="center" gap="4" width="full">
          <Carousel.PrevTrigger asChild>
            <IconButton size="xs" variant="outline">
              <LuArrowLeft />
            </IconButton>
          </Carousel.PrevTrigger>

          <Carousel.ItemGroup w="full">
            {testimonialsData.testimonials.map((testimonial, index) => (
              <Carousel.Item key={index} index={index}>
                <Box
                  w="full"
                  minH={"250px"}
                  pl={{ base: 4, md: 8 }}
                  pr={{ base: 4, md: 8 }}
                  pb={{ base: 2, md: 4 }}
                  pt={{ base: 2, md: 4 }}
                >
                  <MyAppsTestimonialItem testimonial={testimonial} />
                </Box>
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>

          <Carousel.NextTrigger asChild>
            <IconButton size="xs" variant="outline">
              <LuArrowRight />
            </IconButton>
          </Carousel.NextTrigger>
        </Carousel.Control>

        <Carousel.Indicators />
      </Carousel.Root>
    </Box>
  );
};

export default MyAppsTestimonials;

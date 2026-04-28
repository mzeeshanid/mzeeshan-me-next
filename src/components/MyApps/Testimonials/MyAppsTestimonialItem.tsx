import { useColorPalette } from "@/contexts/useColorPalette";
import { MyAppsTestimonialItemDataModel } from "@/data/myApps/myAppTestimonialData";
import { Blockquote, Box, Float, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

type Props = {
  testimonial: MyAppsTestimonialItemDataModel;
};

const MyAppsTestimonialItem: React.FC<Props> = (props: Props) => {
  const { testimonial } = props;
  const { palette } = useColorPalette();

  return (
    <Box h={"full"}>
      <VStack h={"full"} justify={"space-between"} gap={6}>
        <HStack>
          <Box w="44px" h="44px" flexShrink={0} bg="bg.muted" rounded="lg" overflow="hidden">
            <Image
              src={testimonial.app.icon.src}
              placeholder="blur"
              alt={`${testimonial.app.title} icon`}
              width={44}
              height={44}
              sizes="44px"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          <Text>{testimonial.app.title}</Text>
        </HStack>

        <Blockquote.Root
          variant="plain"
          colorPalette={palette}
          textAlign={"center"}
        >
          <Float placement="top-start" offsetY="2">
            <Blockquote.Icon />
          </Float>
          <Blockquote.Content
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
            fontWeight={"medium"}
          >
            {testimonial.review.text}
          </Blockquote.Content>
        </Blockquote.Root>

        <VStack gap={0}>
          <Text>{testimonial.review.name}</Text>
          <Text fontSize="xs" color="fg.muted">
            {testimonial.review.country}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default MyAppsTestimonialItem;

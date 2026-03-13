import { useColorPalette } from "@/contexts/useColorPalette";
import { MyAppReviewItemDataModel } from "@/data/myApps/myAppReviewsData";
import {
  Avatar,
  Card,
  HStack,
  Icon,
  RatingGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { RiDoubleQuotesL } from "react-icons/ri";

type Props = {
  reviewItem: MyAppReviewItemDataModel;
};

const MyAppReviewItem: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();
  const { name, rating, text, date, country, isVerified, icon } =
    props.reviewItem;
  return (
    <Card.Root h="full">
      <Card.Header>
        <HStack justify="space-between">
          <RatingGroup.Root
            count={5}
            defaultValue={rating}
            size="md"
            readOnly
            colorPalette={palette}
            aria-label={`${name}'s rating ${rating} out of 5 stars`}
          >
            <RatingGroup.HiddenInput />
            <RatingGroup.Control />
          </RatingGroup.Root>
          <HStack>
            <Text fontSize="sm" color="fg.muted">
              {date}
            </Text>
            {isVerified && (
              <Icon as={FiCheckCircle} color={palette} size={"md"} />
            )}
          </HStack>
        </HStack>
      </Card.Header>
      <Card.Body>
        <HStack align="start">
          <Icon
            as={RiDoubleQuotesL}
            color={palette}
            size={{ base: "lg", md: "xl", lg: "2xl" }}
          />
          <Text fontSize="md" color="fg.muted" mt={2}>
            {text}
          </Text>
        </HStack>
      </Card.Body>
      <Card.Footer>
        <Stack gap={4} w="full">
          <HStack gap={4} justify={"space-between"}>
            <HStack>
              <Avatar.Root colorPalette={palette}>
                <Avatar.Fallback name={name} />
              </Avatar.Root>
              <VStack align="start" gap={0}>
                <Text fontWeight="bold">{name}</Text>
                <Text fontSize="sm" color="fg.subtle">
                  {country}
                </Text>
              </VStack>
            </HStack>
            <Icon as={icon} size={"md"} color={"fg.muted"} />
          </HStack>
        </Stack>
      </Card.Footer>
    </Card.Root>
  );
};

export default MyAppReviewItem;

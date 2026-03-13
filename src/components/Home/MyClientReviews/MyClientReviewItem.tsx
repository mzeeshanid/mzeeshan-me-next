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

import { FiCheckCircle } from "react-icons/fi";
import { RiDoubleQuotesL } from "react-icons/ri";

import { useColorPalette } from "@/contexts/useColorPalette";
import React from "react";
import { IconType } from "react-icons";

type MyClientReviewItemProps = {
  name: string;
  rating: number;
  countryCode: string;
  country: string;
  platform: string;
  text: string;
  icon: IconType;
  isVerified: boolean;
  date: string;
};

const MyClientReviewItem: React.FC<MyClientReviewItemProps> = ({
  name,
  rating,
  country,
  platform,
  text,
  isVerified,
  date,
  icon,
}) => {
  const { palette } = useColorPalette();
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
                  {country} • {platform}
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

export default MyClientReviewItem;

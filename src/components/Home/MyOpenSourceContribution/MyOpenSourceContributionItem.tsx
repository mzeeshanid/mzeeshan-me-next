import { useColorPalette } from "@/contexts/useColorPalette";
import { MyContributionData } from "@/data/home/myContributionData";
import {
  Box,
  Card,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import { GithubInfoButton } from "./GithubInfoButton";

type OpenSourceContributionItemProps = {
  contribution: MyContributionData;
};

const MyOpenSourceContributionItem: React.FC<
  OpenSourceContributionItemProps
> = (props) => {
  const { contribution } = props;
  const { palette } = useColorPalette();
  return (
    <Card.Root h="full">
      <Card.Header>
        <VStack align={"flex-start"}>
          <HStack alignItems={"flex-start"} justify={"flex-start"}>
            <Icon
              as={FaGithub}
              size={{ base: "xl", md: "2xl" }}
              colorPalette={palette}
            />
            <VStack align={"flex-start"}>
              <Heading
                fontWeight={"bold"}
                as="h3"
                size={{ base: "xl", md: "2xl" }}
                aria-label={contribution.ariaLabel}
              >
                {contribution.title}
              </Heading>
              <Text aria-label={contribution.ariaLabel}>
                {contribution.detail}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Card.Header>
      <Card.Body>
        <Box as="ul" alignItems={"flex-start"} w="full" pl={2}>
          {contribution.features.map((feature, fIdx) => (
            <Box as="li" key={fIdx} mb={2}>
              <HStack>
                <Icon as={FiCheckCircle} colorPalette={palette} />
                <Text aria-label={feature}>{feature}</Text>
              </HStack>
            </Box>
          ))}
        </Box>
      </Card.Body>
      <Card.Footer justifyContent={{ base: "flex-start", md: "flex-end" }}>
        <Stack
          direction={{ base: "column", md: "row" }}
          justify={"space-between"}
          gap={2}
          w="full"
        >
          <GithubInfoButton
            flex={{ base: "auto", md: 1, lg: "auto" }}
            w={{ base: "full", md: "auto" }}
            repoUrl={contribution.link}
            infoType="stars"
          />
          <GithubInfoButton
            flex={{ base: "auto", md: 1, lg: "auto" }}
            w={{ base: "full", md: "auto" }}
            repoUrl={contribution.link}
            infoType="forks"
          />
          <GithubInfoButton
            flex={{ base: "auto", md: 1, lg: "auto" }}
            w={{ base: "full", md: "auto" }}
            repoUrl={contribution.link}
            infoType="download"
          />
        </Stack>
      </Card.Footer>
    </Card.Root>
  );
};

export default MyOpenSourceContributionItem;

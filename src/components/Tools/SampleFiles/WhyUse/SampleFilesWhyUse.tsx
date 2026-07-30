import { useColorPalette } from "@/contexts/useColorPalette";
import { Box, Center, Heading, Icon, List, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { LuCircleCheck } from "react-icons/lu";

type Props = {
  categoryName?: string;
};

const benefits = [
  "Free to use, no account or email required",
  "Trusted by developers, QA engineers, and students worldwide",
  "Every file is safe, virus-scanned, and license-free for testing",
  "Actively maintained, with new variants added regularly based on real developer and QA requests",
];

const SampleFilesWhyUse: React.FC<Props> = ({ categoryName }) => {
  const { palette } = useColorPalette();

  return (
    <Box
      as="section"
      bg="bg.subtle"
      borderRadius="xl"
      p={{ base: 6, md: 10 }}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        gap={{ base: 6, md: 12 }}
        align="flex-start"
      >
        <VStack align="flex-start" gap={3} flex={1}>
          <Heading as="h3" fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
            {categoryName
              ? `Why use our sample ${categoryName.toLowerCase()} files`
              : "Why use our Sample Files"}
          </Heading>
          <Text color="fg.muted">
            We generate and host every sample file specifically for testing —
            not stock content or placeholders. Every extension, size, and
            variant is built to mirror real-world conditions, so what works
            on our samples works in production.
          </Text>
        </VStack>

        <List.Root variant="plain" gap={4} flex={1}>
          {benefits.map((item, idx) => (
            <List.Item key={idx}>
              <Center pt={1}>
                <List.Indicator asChild>
                  <Icon as={LuCircleCheck} color={`${palette}.fg`} />
                </List.Indicator>
              </Center>
              <Text>{item}</Text>
            </List.Item>
          ))}
        </List.Root>
      </Stack>
    </Box>
  );
};

export default SampleFilesWhyUse;

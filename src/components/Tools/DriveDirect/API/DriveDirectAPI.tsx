import { MarkDownCodeBlock } from "@/components/Markdown/CodeBlock";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

type Props = {};

const DriveDirectAPI: React.FC<Props> = (props: Props) => {
  return (
    <Box as="section">
      <Center>
        <SectionHeader
          textAlign={"center"}
          tagline="API"
          headline="DriveDirect API"
          description="Integrate DriveDirect functionality into your own applications using easy-to-use API."
        />
      </Center>
      <Spacer p={{ base: 2, md: 4 }} />
      <Center>
        <VStack>
          <Heading fontSize={{ base: "xl", md: "2xl" }}>
            {"Single Link Request"}
          </Heading>
          <Text color={"fg.muted"}>
            {"Use the curl below to test the request"}
          </Text>
        </VStack>
      </Center>
      <SimpleGrid minChildWidth={"sm"} gap={4}>
        <GridItem>
          <Spacer p={{ base: 2, md: 4 }} />
          <Text>{"Request"}</Text>
          <MarkDownCodeBlock>
            {String(
              `curl --location 'https://mzeeshan.me/api/drivedirect?shareableLink=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1saOkqD7E3U3i5UzfJjsoiG4sL0Os66qO%2Fview%3Fusp%3Ddrive_link'`
            )}
          </MarkDownCodeBlock>
        </GridItem>
        <GridItem>
          <Spacer p={{ base: 2, md: 4 }} />
          <Text>{"Output"}</Text>
          <MarkDownCodeBlock className="json">
            {String(`{
    "success": true,
    "data": {
        "directLink": "https://drive.google.com/uc?export=download&id=1saOkqD7E3U3i5UzfJjsoiG4sL0Os66qO"
    }
}`)}
          </MarkDownCodeBlock>
        </GridItem>
      </SimpleGrid>
      <Spacer p={{ base: 2, md: 4 }} />
      <Center>
        <VStack>
          <Heading fontSize={{ base: "xl", md: "2xl" }}>
            {"Multiple Links Request"}
          </Heading>
          <Text color={"fg.muted"}>
            {"Use the curl below to test the request"}
          </Text>
        </VStack>
      </Center>
      <SimpleGrid minChildWidth={"sm"} gap={4}>
        <GridItem>
          <Spacer p={{ base: 2, md: 4 }} />
          <Text>{"Request"}</Text>
          <MarkDownCodeBlock>
            {String(`curl --location 'https://mzeeshan.me/api/drivedirect' \
--header 'Content-Type: application/json' \
--data '{
    "shareableLinks": [
        "https://drive.google.com/file/d/1saOkqD7E3U3i5UzfJjsoiG4sL0Os66qO/view?usp=drive_link",
        "https://drive.google.com/file/d/1saOkqD7E3U3i5UzfJjsoiG4sL0Os66qO/view?usp=drive_link"
    ]
}'`)}
          </MarkDownCodeBlock>
        </GridItem>
        <GridItem>
          <Spacer p={{ base: 2, md: 4 }} />
          <Text>{"Output"}</Text>
          <MarkDownCodeBlock className="json">
            {String(`{
    "success": true,
    "data": {
        "directLinks": [
            "https://drive.google.com/uc?export=download&id=1saOkqD7E3U3i5UzfJjsoiG4sL0Os66qO",
            "https://drive.google.com/uc?export=download&id=1saOkqD7E3U3i5UzfJjsoiG4sL0Os66qO"
        ]
    }
}`)}
          </MarkDownCodeBlock>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default DriveDirectAPI;

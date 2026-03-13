import { ExtensionWhatIsData } from "@/data/tools/sampleFiles/sampleFilesExtensionDetails";
import { Box, Center, Container, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

interface Props {
  data: ExtensionWhatIsData;
}

const ExtensionGeneralInfo: React.FC<Props> = ({ data }) => {
  return (
    <Box as="section">
      <Container maxW={"3xl"}>
        <SectionHeader
          tagline={"About"}
          headline={data.title}
          textAlign={"center"}
        />
        <Spacer p={2} />
        <Text
          color="fg.muted"
          textStyle={{ base: "md", md: "lg" }}
          textAlign={"center"}
        >
          {data.content}
        </Text>
      </Container>
    </Box>
  );
};

export default ExtensionGeneralInfo;

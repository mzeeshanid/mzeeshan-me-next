import ArticleContent from "@/components/Blog/ArticleContent/ArticleContent";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ExtensionHistoryData } from "@/data/tools/sampleFiles/sampleFilesExtensionDetails";
import { Box, Center, Link, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  data: ExtensionHistoryData;
}

const ExtensionHistory: React.FC<Props> = ({ data }) => {
  return (
    <Box as="section">
      <SectionHeader
        tagline={"History"}
        headline={data.title}
        textAlign={"center"}
      />
      <Center w="full">
        <Box color="fg.muted" maxW={"3xl"} textAlign={"center"}>
          <ArticleContent content={data.description} />
          {data.ownerWebsite && (
            <Box mt={4}>
              <Text fontSize="sm" color="fg.muted">
                {"Learn more at: "}
                <Link href={data.ownerWebsite}>{data.ownerWebsite}</Link>
              </Text>
            </Box>
          )}
        </Box>
      </Center>
    </Box>
  );
};

export default ExtensionHistory;

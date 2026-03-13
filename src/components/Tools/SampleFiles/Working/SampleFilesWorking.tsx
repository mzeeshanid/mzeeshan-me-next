import { ArticleModel } from "@/apis/articles/articles";
import ArticleItem from "@/components/Blog/ArticlesList/ArticleItem";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { sampleFilesWorkingData } from "@/data/tools/sampleFiles/sampleFilesWorkingData";
import { Box, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  article: ArticleModel;
};

const SampleFilesWorking: React.FC<Props> = (props: Props) => {
  const { article } = props;
  const { header } = sampleFilesWorkingData;

  return (
    <Box as="section">
      <VStack align={"start"} gap={4}>
        <SectionHeader
          tagline={header.badge}
          headline={header.title}
          description={header.desc}
        />
        <ArticleItem article={article} />
      </VStack>
    </Box>
  );
};

export default SampleFilesWorking;

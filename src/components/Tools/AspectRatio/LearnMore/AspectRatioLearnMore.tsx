import { ArticleModel } from "@/apis/articles/articles";
import ArticleItem from "@/components/Blog/ArticlesList/ArticleItem";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { aspectRatioWorkingData } from "@/data/tools/aspectRatio/aspectRatioLearnMoreData";
import { Box, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  article: ArticleModel;
};

const AspectRatioLearnMore: React.FC<Props> = (props: Props) => {
  const learnMore = aspectRatioWorkingData;
  const { article } = props;
  return (
    <Box as="section">
      <VStack align={"start"} gap={4}>
        <SectionHeader
          tagline={learnMore.header.badge}
          headline={learnMore.header.title}
          description={learnMore.header.desc}
        />
        <ArticleItem article={article} />
      </VStack>
    </Box>
  );
};

export default AspectRatioLearnMore;

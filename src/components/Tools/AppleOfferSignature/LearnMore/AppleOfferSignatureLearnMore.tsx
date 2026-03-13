import { ArticleModel } from "@/apis/articles/articles";
import ArticleItem from "@/components/Blog/ArticlesList/ArticleItem";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { Box, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  article: ArticleModel;
};

const AppleOfferSignatureLearnMore: React.FC<Props> = (props: Props) => {
  const learnMore = {
    badge: "Learn More",
    title: "More Information",
    desc: "See Apple promotional offer signature generator in action and learn how it works.",
  };

  const { article } = props;
  return (
    <Box as="section">
      <VStack align={"start"} gap={4}>
        <SectionHeader
          tagline={learnMore.badge}
          headline={learnMore.title}
          description={learnMore.desc}
        />
        <ArticleItem article={article} />
      </VStack>
    </Box>
  );
};

export default AppleOfferSignatureLearnMore;

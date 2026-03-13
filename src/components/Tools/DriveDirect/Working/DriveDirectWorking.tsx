import { ArticleModel } from "@/apis/articles/articles";
import ArticleItem from "@/components/Blog/ArticlesList/ArticleItem";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { driveDirectData } from "@/data/tools/driveDirect/driveDirectData";
import { Box, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  article: ArticleModel;
};

const DriveDirectWorking: React.FC<Props> = (props: Props) => {
  const { working } = driveDirectData();
  const { article } = props;
  return (
    <Box as="section">
      <VStack align={"start"} gap={4}>
        <SectionHeader
          tagline={working.header.badge}
          headline={working.header.title}
          description={working.header.desc}
        />
        <ArticleItem article={article} />
      </VStack>
    </Box>
  );
};

export default DriveDirectWorking;

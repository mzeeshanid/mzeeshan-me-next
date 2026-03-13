import { Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

type ArticleTitleDetailProps = {
  title: string;
  subtitle?: string;
};

const ArticleTitleDetail: React.FC<ArticleTitleDetailProps> = (
  props: ArticleTitleDetailProps
) => {
  const { title, subtitle } = props;
  return (
    <VStack align={"flex-start"}>
      <Heading as="h1" size="2xl">
        {title}
      </Heading>
      {subtitle && <Text color="fg.muted">{subtitle}</Text>}
    </VStack>
  );
};

export default ArticleTitleDetail;

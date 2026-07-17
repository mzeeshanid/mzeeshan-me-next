import { Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

type ArticleTitleDetailProps = {
  title: string;
  subtitle?: string;
  headingAs?: "h1" | "h2" | "h3";
};

const ArticleTitleDetail: React.FC<ArticleTitleDetailProps> = (
  props: ArticleTitleDetailProps
) => {
  const { title, subtitle, headingAs = "h1" } = props;
  return (
    <VStack align={"flex-start"}>
      <Heading as={headingAs} size="2xl">
        {title}
      </Heading>
      {subtitle && <Text color="fg.muted">{subtitle}</Text>}
    </VStack>
  );
};

export default ArticleTitleDetail;

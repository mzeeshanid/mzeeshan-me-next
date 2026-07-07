import ToolByline from "@/components/ToolByline/ToolByline";
import { aspectRatioBlockQuoteData } from "@/data/tools/aspectRatio/aspectRatioBlockquoteData";
import { Blockquote } from "@chakra-ui/react";
import React from "react";

type Props = {};

const AspectRatioBlockquote: React.FC<Props> = (props: Props) => {
  const quote = aspectRatioBlockQuoteData;
  return (
    <Blockquote.Root>
      <Blockquote.Content>{quote.quote}</Blockquote.Content>
      <Blockquote.Caption>
        <ToolByline />
      </Blockquote.Caption>
    </Blockquote.Root>
  );
};

export default AspectRatioBlockquote;

import ArticleContent from "@/components/Blog/ArticleContent/ArticleContent";
import { Blockquote } from "@chakra-ui/react";
import React from "react";

type Props = {};

const AppleOfferSignatureBlockQuote: React.FC<Props> = (props: Props) => {
  const content = `**NB:** This tool works within a browser locally and does not sync keys. You can always revoke your keys from  [App Store Connect.](https://appstoreconnect.apple.com/) Server side is required to get the additional parameters mainly because adding your private key inside your app's bundle isn't a good idea.`;
  return (
    <Blockquote.Root>
      <Blockquote.Content>
        <ArticleContent content={content} />
      </Blockquote.Content>
    </Blockquote.Root>
  );
};

export default AppleOfferSignatureBlockQuote;

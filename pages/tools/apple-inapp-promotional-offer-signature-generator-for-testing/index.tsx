import { fetchArticleBySlugStrapi } from "@/apis/articles/articleDetail";
import { ArticleModel } from "@/apis/articles/articles";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import ToolRelatedArticle from "@/components/Tools/RelatedArticle/ToolRelatedArticle";
import AppleOfferSignatureBlockQuote from "@/components/Tools/AppleOfferSignature/BlockQuote/AppleOfferSignatureBlockQuote";
import AppleOfferSignatureForm from "@/components/Tools/AppleOfferSignature/Form/AppleOfferSignatureForm";
import AppleOfferSignatureHero from "@/components/Tools/AppleOfferSignature/Hero/AppleOfferSignatureHero";
import AppleOfferSignatureSeo from "@/components/Tools/AppleOfferSignature/Seo/AppleOfferSignatureSeo";
import AppleOfferSignatureUsage from "@/components/Tools/AppleOfferSignature/Usage/AppleOfferSignatureUsage";
import { appleOfferSignatureHeaderData } from "@/data/tools/appleOfferSignature/appleOfferSignatureHeaderData";
import { appleOfferSignatureMetaData } from "@/data/tools/appleOfferSignature/appleOfferSignatureMetaData";
import { Container, Spacer } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";

type Props = {
  article: ArticleModel;
};

const AppleInAppOfferSignatureHome: React.FC<Props> = (props: Props) => {
  const meta = appleOfferSignatureMetaData;
  return (
    <>
      <AppleOfferSignatureSeo />
      <NavBar header={appleOfferSignatureHeaderData} />
      <main>
      <Spacer p={4} />

      <Container maxW="6xl">
        <PageHeader
          title={meta.title}
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: meta.title },
          ]}
        />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <AppleOfferSignatureHero />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <AppleOfferSignatureForm />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <AppleOfferSignatureBlockQuote />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <AppleOfferSignatureUsage />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <ToolRelatedArticle
          article={props.article}
          header={{
            badge: "Learn More",
            title: "More Information",
            desc: "See Apple promotional offer signature generator in action and learn how it works.",
          }}
        />
      </Container>

      <Spacer p={4} />
      </main>
      <Footer />
    </>
  );
};
export const getStaticProps: GetStaticProps<Props> = (async (
  context: GetStaticPropsContext,
) => {
  const slug = "apple-promotional-offer-signature-generator";
  const [article] = await Promise.all([fetchArticleBySlugStrapi(slug)]);

  return {
    props: { article },
    revalidate: 60,
  };
}) satisfies GetStaticProps<Props>;

export default AppleInAppOfferSignatureHome;

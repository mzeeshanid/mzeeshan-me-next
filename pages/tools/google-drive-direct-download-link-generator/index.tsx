import { fetchArticleBySlugStrapi } from "@/apis/articles/articleDetail";
import { ArticleModel } from "@/apis/articles/articles";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import ToolRelatedArticle from "@/components/Tools/RelatedArticle/ToolRelatedArticle";
import DriveDirectAPI from "@/components/Tools/DriveDirect/API/DriveDirectAPI";
import DriveDirectComparison from "@/components/Tools/DriveDirect/Comparison/DriveDirectComparison";
import DriveDirectFaqs from "@/components/Tools/DriveDirect/Faqs/DriveDirectFaqs";
import DriveDirectFeatures from "@/components/Tools/DriveDirect/Features/DriveDirectFeatures";
import DriveDirectHero from "@/components/Tools/DriveDirect/Hero/DriveDirectHero";
import DriveDirectLimitations from "@/components/Tools/DriveDirect/Limitations/DriveDirectLimitations";
import DriveDirectLinks from "@/components/Tools/DriveDirect/Output/DriveDirectLinks";
import DriveDirectSeo from "@/components/Tools/DriveDirect/Seo/DriveDirectSeo";
import DriveDirectSteps from "@/components/Tools/DriveDirect/Steps/DriveDirectSteps";
import DriveDirectUsage from "@/components/Tools/DriveDirect/Usage/DriveDirectUsage";
import { driveDirectData } from "@/data/tools/driveDirect/driveDirectData";
import { Container, Spacer } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";

type DriveDirectHomeProps = {
  article: ArticleModel;
};

const DriveDirectHome: React.FC<DriveDirectHomeProps> = (
  props: DriveDirectHomeProps,
) => {
  const { article } = props;
  const { header } = driveDirectData();

  const [links, setLinks] = React.useState<string[]>([""]);

  return (
    <>
      <DriveDirectSeo />
      <NavBar header={header} />
      <Spacer p={4} />

      <Container maxW="6xl">
        <PageHeader
          title="Google Drive Direct Link Generator"
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Google Drive Direct Link Generator" },
          ]}
        />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <DriveDirectHero
          onDirectLinkGenerated={(links: string[]) => {
            setLinks(links);
          }}
        />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <DriveDirectLinks links={links} />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <DriveDirectFeatures />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <DriveDirectSteps />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <DriveDirectLimitations />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <DriveDirectUsage />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <DriveDirectAPI />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <ToolRelatedArticle article={article} header={driveDirectData().working.header} />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <DriveDirectComparison />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <DriveDirectFaqs />
      </Container>

      <Spacer p={4} />
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<DriveDirectHomeProps> = (async (
  context: GetStaticPropsContext,
) => {
  const slug = "getting-google-drive-direct-link";
  const [article] = await Promise.all([fetchArticleBySlugStrapi(slug)]);

  return {
    props: { article },
    revalidate: 60,
  };
}) satisfies GetStaticProps<DriveDirectHomeProps>;

export default DriveDirectHome;

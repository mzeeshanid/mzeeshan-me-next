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
import DriveDirectUseCases from "@/components/Tools/DriveDirect/UseCases/DriveDirectUseCases";
import { driveDirectData } from "@/data/tools/driveDirect/driveDirectData";
import { Toaster } from "@/components/ui/toaster";
import { AspectRatio, Box, Container, Spacer } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import React from "react";

type DriveDirectHomeProps = {
  article?: ArticleModel;
};

const DriveDirectHome: React.FC<DriveDirectHomeProps> = (
  props: DriveDirectHomeProps,
) => {
  const { article } = props;
  const { header } = driveDirectData();

  const [links, setLinks] = React.useState<string[]>([""]);

  return (
    <>
      <Toaster />
      <DriveDirectSeo />
      <NavBar header={header} />
      <main>
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

      <Spacer p={8} />
      <Container maxW="6xl">
        <AspectRatio ratio={16 / 9}>
          <iframe
            src="https://www.youtube.com/embed/0sGxcQeC3XM"
            title="Google Drive Direct Download Link Generator Tutorial"
            allowFullScreen
          />
        </AspectRatio>
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
        <DriveDirectUseCases />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <DriveDirectAPI />
      </Container>

      {article && (
        <Box>
          <Spacer p={4} />
          <Container maxW="6xl">
            <ToolRelatedArticle article={article} header={driveDirectData().working.header} />
          </Container>
        </Box>
      )}

      <Spacer p={4} />
      <Container maxW="6xl">
        <DriveDirectComparison />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <DriveDirectFaqs />
      </Container>

      <Spacer p={4} />
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<DriveDirectHomeProps> = async () => {
  try {
    const article = await fetchArticleBySlugStrapi("getting-google-drive-direct-link");
    return { props: { article }, revalidate: 3600 };
  } catch {
    return { props: {}, revalidate: 60 };
  }
};

export default DriveDirectHome;

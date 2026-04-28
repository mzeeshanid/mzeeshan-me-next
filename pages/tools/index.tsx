import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import MyToolsHero from "@/components/Tools/MyTools/Hero/MyToolsHero";
import MyToolsListing from "@/components/Tools/MyTools/Listing/MyToolsListing";
import MyToolsFeatures from "@/components/Tools/MyTools/Features/MyToolsFeatures";
import MyToolsStatistics from "@/components/Tools/MyTools/Stats/MyToolsStats";
import MyToolsFAQ from "@/components/Tools/MyTools/Faqs/MyToolsFaqs";
import MyToolsCTA from "@/components/Tools/MyTools/CTA/MyToolsCTA";
import { Box, Container, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import MyToolsSeo from "@/components/Tools/MyTools/Seo/MyToolsSeo";

type Props = {};

const MyToolsHome: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const [keyword, setKeyword] = React.useState<string>("");

  // Sync keyword with router query params
  React.useEffect(() => {
    if (router.isReady) {
      const queryKeyword = (router.query.keyword as string) || "";
      setKeyword(queryKeyword);
    }
  }, [router.isReady, router.query.keyword]);

  return (
    <>
      <MyToolsSeo />
      <NavBar />
      <main>
      <Spacer p={4} />

      <Container maxW="6xl">
        <PageHeader
          title="Helper Tools"
          breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Tools" }]}
        />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <Box data-tools-listing>
          <MyToolsHero
            keyword={keyword}
            searchFieldTextChanaged={(text: string) => setKeyword(text)}
          />
        </Box>
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <MyToolsListing keyword={keyword} />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <MyToolsFeatures />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <MyToolsStatistics />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <MyToolsFAQ />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <MyToolsCTA />
      </Container>

      <Spacer p={4} />
      </main>
      <Footer />
    </>
  );
};

export default MyToolsHome;

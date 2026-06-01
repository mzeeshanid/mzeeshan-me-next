import React from "react";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import ColorConverterHero from "@/components/Tools/ColorFormatConverter/Hero/ColorConverterHero";
import ColorConverterFeatures from "@/components/Tools/ColorFormatConverter/Features/ColorConverterFeatures";
import ColorConverterHowItWorks from "@/components/Tools/ColorFormatConverter/HowItWorks/ColorConverterHowItWorks";
import ColorConverterCodeExamples from "@/components/Tools/ColorFormatConverter/CodeExamples/ColorConverterCodeExamples";
import ColorConverterComparison from "@/components/Tools/ColorFormatConverter/Comparison/ColorConverterComparison";
import ColorConverterFaqs from "@/components/Tools/ColorFormatConverter/Faqs/ColorConverterFaqs";
import ColorConverterSeo from "@/components/Tools/ColorFormatConverter/Seo/ColorConverterSeo";
import { colorConverterHeaderData } from "@/data/tools/colorFormatConverter";
import { Container, Spacer } from "@chakra-ui/react";

const ColorFormatConverterPage: React.FC = () => {
  const { title, subtitle, icon, alt } = colorConverterHeaderData;

  return (
    <>
      <ColorConverterSeo />
      <NavBar
        header={{
          title,
          subtitle,
          icon,
          alt,
          rounded: false,
        }}
      />
      <main>
        <Spacer p={4} />

        <Container maxW="6xl">
          <PageHeader
            title="Color Format Converter"
            breadcrumbItems={[
              { label: "Home", href: "/" },
              { label: "Tools", href: "/tools" },
              { label: "Color Format Converter" },
            ]}
          />
        </Container>

        <Spacer p={4} />
        <Container maxW="6xl">
          <ColorConverterHero />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <ColorConverterFeatures />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <ColorConverterHowItWorks />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <ColorConverterCodeExamples />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <ColorConverterComparison />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <ColorConverterFaqs />
        </Container>

        <Spacer p={8} />
      </main>
      <Footer />
    </>
  );
};

export default ColorFormatConverterPage;

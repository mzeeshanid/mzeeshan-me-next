import React from "react";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import Base64EncoderDecoderHero from "@/components/Tools/Base64EncoderDecoder/Hero/Base64EncoderDecoderHero";
import Base64Features from "@/components/Tools/Base64EncoderDecoder/Features/Base64Features";
import Base64UseCases from "@/components/Tools/Base64EncoderDecoder/UseCases/Base64UseCases";
import Base64CodeExamples from "@/components/Tools/Base64EncoderDecoder/CodeExamples/Base64CodeExamples";
import Base64Troubleshooting from "@/components/Tools/Base64EncoderDecoder/Troubleshooting/Base64Troubleshooting";
import Base64Comparison from "@/components/Tools/Base64EncoderDecoder/Comparison/Base64Comparison";
import Base64Faqs from "@/components/Tools/Base64EncoderDecoder/Faqs/Base64Faqs";
import Base64Seo from "@/components/Tools/Base64EncoderDecoder/Seo/Base64Seo";
import { base64HeaderData } from "@/data/tools/base64EncoderDecoder/base64EncoderDecoderFeatures";
import { Container, Spacer } from "@chakra-ui/react";

const Base64EncoderDecoderHome: React.FC = () => {
  const { title, subtitle, icon, alt } = base64HeaderData;

  return (
    <>
      <Base64Seo />
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
            title="Base64 Encoder & Decoder"
            breadcrumbItems={[
              { label: "Home", href: "/" },
              { label: "Tools", href: "/tools" },
              { label: "Base64 Encoder & Decoder" },
            ]}
          />
        </Container>

        <Spacer p={4} />
        <Container maxW="6xl">
          <Base64EncoderDecoderHero />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <Base64Features />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <Base64UseCases />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <Base64CodeExamples />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <Base64Troubleshooting />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <Base64Comparison />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <Base64Faqs />
        </Container>

        <Spacer p={8} />
      </main>
      <Footer />
    </>
  );
};

export default Base64EncoderDecoderHome;

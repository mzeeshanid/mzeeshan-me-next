import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import UnixTimestampBulkConvert from "@/components/Tools/UnixTimestamp/BulkConvert/UnixTimestampBulkConvert";
import UnixTimestampDevTools from "@/components/Tools/UnixTimestamp/DevTools/UnixTimestampDevTools";
import UnixTimestampComparison from "@/components/Tools/UnixTimestamp/Comparison/UnixTimestampComparison";
import UnixTimestampDiscord from "@/components/Tools/UnixTimestamp/Discord/UnixTimestampDiscord";
import UnixTimestampFaqs from "@/components/Tools/UnixTimestamp/Faqs/UnixTimestampFaqs";
import UnixTimestampFeatures from "@/components/Tools/UnixTimestamp/Features/UnixTimestampFeatures";
import UnixTimestampHero from "@/components/Tools/UnixTimestamp/Hero/UnixTimestampHero";
import UnixTimestampSeo from "@/components/Tools/UnixTimestamp/Seo/UnixTimestampSeo";
import UnixTimestampTimezone from "@/components/Tools/UnixTimestamp/Timezone/UnixTimestampTimezone";
import UnixTimestampUseCases from "@/components/Tools/UnixTimestamp/UseCases/UnixTimestampUseCases";
import UnixTimestampWhatIs from "@/components/Tools/UnixTimestamp/WhatIs/UnixTimestampWhatIs";
import UnixTimestampY2038 from "@/components/Tools/UnixTimestamp/Y2038/UnixTimestampY2038";
import { unixTimestampHeaderData } from "@/data/tools/unixTimestamp/unixTimestampHeaderData";
import { unixTimestampMetaData } from "@/data/tools/unixTimestamp/unixTimestampMetaData";
import { Container, Spacer } from "@chakra-ui/react";
import React from "react";

const UnixTimestampConverterHome: React.FC = () => {
  const meta = unixTimestampMetaData;
  return (
    <>
      <UnixTimestampSeo />
      <NavBar header={unixTimestampHeaderData} />
      <main>
      <Spacer p={4} />

      <Container maxW="6xl">
        <PageHeader
          title={meta.title}
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Epoch Converter" },
          ]}
        />
      </Container>

      {/* Main Converter */}
      <Spacer p={4} />
      <Container maxW="6xl">
        <UnixTimestampHero />
      </Container>

      {/* Features strip */}
      <Spacer p={8} />
      <Container maxW="6xl">
        <UnixTimestampFeatures />
      </Container>

      {/* Discord Timestamp Generator */}
      <Spacer p={8} />
      <Container maxW="6xl">
        <UnixTimestampDiscord />
      </Container>

      {/* Developer Snippets (incl. Excel/Sheets/PowerShell) */}
      <Spacer p={8} />
      <Container maxW="6xl">
        <UnixTimestampDevTools />
      </Container>

      {/* Bulk / Batch Converter */}
      <Spacer p={8} />
      <Container maxW="6xl">
        <UnixTimestampBulkConvert />
      </Container>

      {/* What is Unix Time */}
      <Spacer p={8} />
      <Container maxW="6xl">
        <UnixTimestampWhatIs />
      </Container>

      {/* Timezone Converter */}
      <Spacer p={8} />
      <Container maxW="6xl">
        <UnixTimestampTimezone />
      </Container>

      {/* Y2038 Problem */}
      <Spacer p={8} />
      <Container maxW="6xl">
        <UnixTimestampY2038 />
      </Container>

      {/* Use Cases */}
      <Spacer p={8} />
      <Container maxW="6xl">
        <UnixTimestampUseCases />
      </Container>

      {/* Comparison */}
      <Spacer p={8} />
      <Container maxW="6xl">
        <UnixTimestampComparison />
      </Container>

      {/* FAQ */}
      <Spacer p={8} />
      <Container maxW="6xl">
        <UnixTimestampFaqs />
      </Container>

      <Spacer p={4} />
      </main>
      <Footer />
    </>
  );
};

export default UnixTimestampConverterHome;

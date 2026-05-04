import React, { useState } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import FreelanceTaxCalculatorHero from "@/components/Tools/FreelanceTaxCalculator/Hero/FreelanceTaxCalculatorHero";
import FreelanceTaxWhoIsFreelancer from "@/components/Tools/FreelanceTaxCalculator/WhoIsFreelancer/FreelanceTaxWhoIsFreelancer";
import FreelanceTaxRates from "@/components/Tools/FreelanceTaxCalculator/TaxRates/FreelanceTaxRates";
import FreelanceTaxHowItWorks from "@/components/Tools/FreelanceTaxCalculator/HowItWorks/FreelanceTaxHowItWorks";
import FreelanceTaxWhatIsPSEB from "@/components/Tools/FreelanceTaxCalculator/WhatIsPSEB/FreelanceTaxWhatIsPSEB";
import FreelanceTaxFilerBenefits from "@/components/Tools/FreelanceTaxCalculator/FilerBenefits/FreelanceTaxFilerBenefits";
import FreelanceTaxFilingServices from "@/components/Tools/FreelanceTaxCalculator/FilingServices/FreelanceTaxFilingServices";
import FreelanceTaxFeatures from "@/components/Tools/FreelanceTaxCalculator/Features/FreelanceTaxFeatures";
import FreelanceTaxFaqs from "@/components/Tools/FreelanceTaxCalculator/Faqs/FreelanceTaxFaqs";
import FreelanceTaxSeo from "@/components/Tools/FreelanceTaxCalculator/Seo/FreelanceTaxSeo";
import FreelanceTaxChartsSkeleton from "@/components/Tools/FreelanceTaxCalculator/Charts/FreelanceTaxChartsSkeleton";
import PakTaxRelatedTools from "@/components/Tools/PakTaxRelatedTools/PakTaxRelatedTools";
import { freelanceTaxHeaderData } from "@/data/tools/freelanceTaxCalculator";
import { CURRENT_FREELANCE_TAX_YEAR } from "@/data/tools/freelanceTaxCalculator/freelanceTaxYearsData";
import { FreelanceTaxResult } from "@/services/freelanceTaxService";
import { Box, Container, Spacer } from "@chakra-ui/react";

const FreelanceTaxCharts = dynamic(
  () => import("@/components/Tools/FreelanceTaxCalculator/Charts/FreelanceTaxCharts"),
  { ssr: false, loading: () => <FreelanceTaxChartsSkeleton /> }
);

const FreelanceTaxCalculatorHome: React.FC = () => {
  const [result, setResult] = useState<FreelanceTaxResult | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>(CURRENT_FREELANCE_TAX_YEAR);
  const [isPSEB, setIsPSEB] = useState<boolean>(false);
  const { title, subtitle, icon, alt } = freelanceTaxHeaderData;

  return (
    <>
      <FreelanceTaxSeo />
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
            title="Pakistan Freelance Tax Calculator"
            breadcrumbItems={[
              { label: "Home", href: "/" },
              { label: "Tools", href: "/tools" },
              { label: "Freelance Tax Calculator" },
            ]}
          />
        </Container>

        <Spacer p={4} />
        <Container maxW="6xl">
          <FreelanceTaxCalculatorHero
            onResultChange={setResult}
            onYearChange={setSelectedYear}
            onPSEBChange={setIsPSEB}
          />
        </Container>

        {result && (
          <>
            <Spacer p={8} />
            <Container maxW="6xl">
              <FreelanceTaxCharts result={result} />
            </Container>
          </>
        )}

        <Spacer p={8} />
        <Container maxW="6xl">
          <FreelanceTaxWhoIsFreelancer />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <FreelanceTaxRates selectedYear={selectedYear} isPSEB={isPSEB} />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <FreelanceTaxHowItWorks result={result} />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <FreelanceTaxWhatIsPSEB />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <FreelanceTaxFilerBenefits />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <FreelanceTaxFilingServices />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <FreelanceTaxFeatures />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <FreelanceTaxFaqs />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <PakTaxRelatedTools currentToolId="freelance" />
        </Container>

        <Spacer p={8} />
      </main>
      <Footer />
    </>
  );
};

export default FreelanceTaxCalculatorHome;

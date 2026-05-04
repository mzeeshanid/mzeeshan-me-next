import React, { useState } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import SalaryTaxCalculatorHero from "@/components/Tools/SalaryTaxCalculator/Hero/SalaryTaxCalculatorHero";
import SalaryTaxSlabs from "@/components/Tools/SalaryTaxCalculator/TaxSlabs/SalaryTaxSlabs";
import SalaryTaxHowItWorks from "@/components/Tools/SalaryTaxCalculator/HowItWorks/SalaryTaxHowItWorks";
import SalaryTaxFilerBenefits from "@/components/Tools/SalaryTaxCalculator/FilerBenefits/SalaryTaxFilerBenefits";
import SalaryTaxFilingServices from "@/components/Tools/SalaryTaxCalculator/FilingServices/SalaryTaxFilingServices";
import SalaryTaxFeatures from "@/components/Tools/SalaryTaxCalculator/Features/SalaryTaxFeatures";
import SalaryTaxFaqs from "@/components/Tools/SalaryTaxCalculator/Faqs/SalaryTaxFaqs";
import SalaryTaxSeo from "@/components/Tools/SalaryTaxCalculator/Seo/SalaryTaxSeo";
import SalaryTaxChartsSkeleton from "@/components/Tools/SalaryTaxCalculator/Charts/SalaryTaxChartsSkeleton";
import PakTaxRelatedTools from "@/components/Tools/PakTaxRelatedTools/PakTaxRelatedTools";
import { salaryTaxHeaderData } from "@/data/tools/salaryTaxCalculator";
import { CURRENT_TAX_YEAR } from "@/data/tools/salaryTaxCalculator/salaryTaxSlabsData";
import { TaxCalculationResult } from "@/services/salaryTaxService";
import { Box, Container, Spacer } from "@chakra-ui/react";

const SalaryTaxCharts = dynamic(
  () => import("@/components/Tools/SalaryTaxCalculator/Charts/SalaryTaxCharts"),
  { ssr: false, loading: () => <SalaryTaxChartsSkeleton /> }
);

const SalaryTaxCalculatorHome: React.FC = () => {
  const [result, setResult] = useState<TaxCalculationResult | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>(CURRENT_TAX_YEAR);
  const { title, subtitle, icon, alt } = salaryTaxHeaderData;

  return (
    <>
      <SalaryTaxSeo />
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
            title="Pakistan Salary Tax Calculator"
            breadcrumbItems={[
              { label: "Home", href: "/" },
              { label: "Tools", href: "/tools" },
              { label: "Salary Tax Calculator" },
            ]}
          />
        </Container>

        <Spacer p={4} />
        <Container maxW="6xl">
          <SalaryTaxCalculatorHero
            onResultChange={setResult}
            onYearChange={setSelectedYear}
          />
        </Container>

        {result && (
          <>
            <Spacer p={8} />
            <Container maxW="6xl">
              <SalaryTaxCharts result={result} />
            </Container>
          </>
        )}

        <Spacer p={8} />
        <Container maxW="6xl">
          <SalaryTaxSlabs
            selectedYear={selectedYear}
            activeSlabIndex={result?.slabIndex ?? null}
          />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <SalaryTaxHowItWorks result={result} selectedYear={selectedYear} />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <SalaryTaxFilerBenefits />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <SalaryTaxFilingServices />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <SalaryTaxFeatures />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <SalaryTaxFaqs />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <PakTaxRelatedTools currentToolId="salary" />
        </Container>

        <Spacer p={8} />
      </main>
      <Footer />
    </>
  );
};

export default SalaryTaxCalculatorHome;

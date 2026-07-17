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
import SalaryTaxRelatedYears from "@/components/Tools/SalaryTaxCalculator/RelatedYears/SalaryTaxRelatedYears";
import PakTaxRelatedTools from "@/components/Tools/PakTaxRelatedTools/PakTaxRelatedTools";
import { salaryTaxHeaderData } from "@/data/tools/salaryTaxCalculator";
import { TaxCalculationResult } from "@/services/salaryTaxService";
import { Container, Spacer } from "@chakra-ui/react";

const SalaryTaxCharts = dynamic(
  () => import("@/components/Tools/SalaryTaxCalculator/Charts/SalaryTaxCharts"),
  { ssr: false, loading: () => <SalaryTaxChartsSkeleton /> }
);

interface SalaryTaxCalculatorPageProps {
  taxYear: string;
}

const SalaryTaxCalculatorPage: React.FC<SalaryTaxCalculatorPageProps> = ({ taxYear }) => {
  const [result, setResult] = useState<TaxCalculationResult | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>(taxYear);
  const { title, subtitle, icon, alt } = salaryTaxHeaderData;

  const fullYear = taxYear.replace("-", "-20");
  const breadcrumbLabel = `Salary Tax Calculator ${fullYear} Pakistan`;

  return (
    <>
      <SalaryTaxSeo taxYear={taxYear} />
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
            title={`Pakistan Salary Tax Calculator ${fullYear}`}
            breadcrumbItems={[
              { label: "Home", href: "/" },
              { label: "Tools", href: "/tools" },
              { label: breadcrumbLabel },
            ]}
          />
        </Container>

        <Spacer p={4} />
        <Container maxW="6xl">
          <SalaryTaxCalculatorHero
            initialYear={taxYear}
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
          <SalaryTaxRelatedYears currentYear={taxYear} />
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

export default SalaryTaxCalculatorPage;

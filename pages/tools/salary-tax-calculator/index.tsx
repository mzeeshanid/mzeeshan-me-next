import { GetServerSideProps } from "next";

// Canonical URL is /tools/salary-tax-calculator-2026-2027-pakistan
// next.config.ts handles the 301 at the edge; this is belt-and-suspenders.
export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: "/tools/salary-tax-calculator-2026-2027-pakistan",
    permanent: true,
  },
});

export default function SalaryTaxCalculatorRedirect() {
  return null;
}

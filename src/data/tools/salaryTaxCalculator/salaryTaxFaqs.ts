export type SalaryTaxFaqItem = {
  question: string;
  answer: string;
};

export type SalaryTaxFaqsData = {
  header: {
    badge: string;
    title: string;
    desc: string;
  };
  faqs: SalaryTaxFaqItem[];
};

export const salaryTaxFaqsData: SalaryTaxFaqsData = {
  header: {
    badge: "FAQs",
    title: "Pakistan Income Tax Questions Answered",
    desc: "Common questions about salary tax, FBR slabs, and take-home pay for salaried employees in Pakistan.",
  },
  faqs: [
    {
      question: "How is income tax calculated on salary in Pakistan?",
      answer:
        "Pakistan uses a progressive slab system for salaried individuals. Your employer annualises your monthly salary (monthly × 12), finds which FBR tax slab it falls into, applies the fixed tax for that slab plus the marginal rate on the excess, then divides by 12 to deduct monthly. This calculator follows the same method.",
    },
    {
      question: "What is the income tax slab for salaried employees in FY 2025-26?",
      answer:
        "For FY 2025-26: 0% on annual income up to PKR 600,000; 1% on PKR 600,001–1,200,000; PKR 6,000 + 11% on PKR 1,200,001–2,200,000; PKR 116,000 + 23% on PKR 2,200,001–3,200,000; PKR 346,000 + 30% on PKR 3,200,001–4,100,000; PKR 616,000 + 35% on income above PKR 4,100,000.",
    },
    {
      question: "How much tax will I pay on a PKR 100,000 monthly salary?",
      answer:
        "On a monthly salary of PKR 100,000, your annual gross is PKR 1,200,000. Under FY 2025-26 slabs this falls at the top of slab 2, giving an annual tax of PKR 6,000 (PKR 500/month). Your take-home would be PKR 99,500/month. Enter your exact amount in the calculator above for a precise result.",
    },
    {
      question: "What is the difference between gross salary and take-home pay in Pakistan?",
      answer:
        "Gross salary is the total amount your employer agrees to pay before deductions. Take-home pay (net salary) is what you actually receive after income tax is withheld. This calculator shows both your monthly and annual gross, the tax deducted, and the resulting take-home.",
    },
    {
      question: "Does Pakistan use a progressive or flat tax system?",
      answer:
        "Pakistan uses a progressive (graduated) slab system for salaried individuals. Only the income within each slab is taxed at that slab's rate — higher slabs do not retroactively tax income in lower slabs. This means your effective tax rate is always lower than your marginal (top slab) rate.",
    },
    {
      question: "What is the tax-free income limit in Pakistan for 2025-26?",
      answer:
        "For FY 2025-26, salaried individuals with annual income up to PKR 600,000 (PKR 50,000/month) pay zero income tax. This exemption limit has been maintained from previous years.",
    },
    {
      question: "How do I know which tax slab I fall under?",
      answer:
        "Enter your monthly salary in the calculator above. The Tax Slabs section will highlight your applicable slab in the table. Your slab is determined by your annualised income (monthly × 12).",
    },
    {
      question: "How did the tax rate change from 2024-25 to 2025-26?",
      answer:
        "The 2025-26 Finance Act brought significant relief for salaried individuals. The rate on PKR 600k–1.2m income dropped from 5% to 1%. The rate on PKR 1.2m–2.2m dropped from 15% to 11%. Higher slabs (3.2m+) remained largely unchanged. You can switch years in the calculator to compare.",
    },
    {
      question: "Is tax calculated on monthly or annual income in Pakistan?",
      answer:
        "FBR tax slabs are defined on annual income. Your employer converts your monthly salary to an annual figure, calculates the annual tax due, then withholds one-twelfth each month. The calculator does exactly this — enter monthly income and it shows both monthly and annual figures.",
    },
    {
      question: "Does this calculator include EOBI, SESSI, or other deductions?",
      answer:
        "No. This calculator focuses on income tax only, calculated per FBR's official salary tax slabs. Deductions like EOBI (Employees' Old-Age Benefits Institution), SESSI, group insurance, or provident fund contributions vary by employer and are not included. Your actual take-home may be slightly lower.",
    },
  ],
};

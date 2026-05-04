export type FreelanceTaxFaq = {
  question: string;
  answer: string;
};

export const freelanceTaxFaqs: FreelanceTaxFaq[] = [
  {
    question: "Who qualifies as a freelancer for tax purposes in Pakistan?",
    answer:
      "For FBR purposes, a freelancer is an individual who provides IT, software development, digital marketing, or other export-oriented services to foreign clients and receives payment in foreign currency via a bank channel (such as Payoneer, Wise, or wire transfer). If you work on platforms like Upwork, Fiverr, or Toptal and your clients are outside Pakistan, you qualify. Local freelancers serving Pakistani clients in PKR are subject to different tax rules and should use the Salary Tax Calculator instead.",
  },
  {
    question: "What is the income tax rate for freelancers in Pakistan 2025-26?",
    answer:
      "For FY 2025-26, Pakistan freelancers exporting services to foreign clients pay tax under Section 154A of the Income Tax Ordinance. PSEB-registered freelancers pay 0.25% of their gross foreign income as a final withholding tax. Non-registered freelancers pay 1% of their gross foreign income. Both rates are applied on the full gross amount — there are no deductions or progressive slabs.",
  },
  {
    question: "What is PSEB and how does registering reduce my tax?",
    answer:
      "PSEB stands for Pakistan Software Export Board — a government body under the Ministry of IT & Telecom that promotes Pakistan's IT exports. Freelancers registered with PSEB qualify for a reduced withholding tax rate of 0.25% instead of the standard 1% under Section 154A. On a monthly income of PKR 100,000 (annual PKR 1,200,000), PSEB registration saves PKR 9,000 per year. Registration is free and can be done at pseb.org.pk.",
  },
  {
    question: "How much tax do I pay on Upwork or Fiverr income in Pakistan?",
    answer:
      "If you earn through Upwork or Fiverr and your clients are outside Pakistan, your income is treated as a foreign IT services export under Section 154A. If you are PSEB registered, you pay 0.25% of your gross income as a final withholding tax. If not registered with PSEB, you pay 1%. For example, if you earn PKR 150,000/month (PKR 1,800,000/year): PSEB rate = PKR 4,500/year; non-PSEB rate = PKR 18,000/year.",
  },
  {
    question: "What is Section 154A of Pakistan's Income Tax Ordinance?",
    answer:
      "Section 154A was introduced to provide a simplified, final withholding tax on income earned by Pakistani resident individuals from the export of IT and IT-enabled services to foreign clients. Banks are required to deduct this tax at source when the foreign remittance is credited to your account. Because it is a final tax, you do not need to separately calculate or report this income under normal business income rules — though you are still required to file an annual return.",
  },
  {
    question: "Do I need to register with FBR as a freelancer?",
    answer:
      "Yes. Even though Section 154A withholding tax is deducted at source by your bank, you are still required to obtain a National Tax Number (NTN) from FBR and file an annual income tax return. Filing keeps you on the Active Taxpayer List (ATL), which entitles you to lower withholding rates on property transactions, vehicle registration, bank withdrawals, and other activities.",
  },
  {
    question: "Is the 0.25% PSEB rate a final tax — do I still need to file a return?",
    answer:
      "Yes, the 0.25% withholding tax under Section 154A is a final tax, meaning it covers your entire tax liability on that income — you do not owe additional income tax on it. However, you are still legally required to file an annual income tax return with FBR. The return is how you stay on the Active Taxpayer List and access filer benefits across other transactions.",
  },
  {
    question: "I serve local Pakistani clients — which tax calculator should I use?",
    answer:
      "This calculator is only for freelancers exporting services to foreign clients and receiving payment in foreign currency. If your clients are based in Pakistan and you are paid in PKR, your income is treated as normal business or salaried income subject to FBR's progressive tax slabs — not Section 154A. In that case, please use the Pakistan Salary Tax Calculator at /tools/salary-tax-calculator.",
  },
  {
    question: "What happens if my foreign payment is received in cash instead of a bank transfer?",
    answer:
      "The Section 154A withholding tax benefit — including both the 0.25% PSEB rate and the 1% standard rate — applies only to income received through official banking channels (bank accounts, Payoneer linked accounts, Wise, direct wire transfers). Cash payments or hawala-based transfers do not qualify for this treatment and may be subject to normal income tax rules. Always receive freelance payments through your bank to benefit from Section 154A.",
  },
  {
    question: "Can I deduct business expenses to reduce my freelance tax liability?",
    answer:
      "No. Because the Section 154A withholding tax is a final tax applied on gross income, there is no provision to deduct business expenses (such as laptop costs, software subscriptions, or internet bills) against it. The 0.25% or 1% rate is applied to your full gross foreign income before any deductions. This is a trade-off: the simplicity and low flat rate offset the inability to deduct expenses.",
  },
  {
    question: "What is the difference between 0.25% and 1% tax for freelancers?",
    answer:
      "The 0.25% rate is available to freelancers registered with PSEB (Pakistan Software Export Board). The 1% rate applies to all other freelancers exporting services to foreign clients who are not PSEB registered. On the same income, the 1% rate is exactly 4× higher than the 0.25% rate. For a monthly income of PKR 200,000 (annual PKR 2,400,000): PSEB tax = PKR 6,000/year vs non-PSEB tax = PKR 24,000/year — a saving of PKR 18,000 per year.",
  },
  {
    question: "How do I know if my income qualifies as an IT export under PSEB rules?",
    answer:
      "Your income qualifies as an IT/IT-enabled services export if: (1) you provide software development, web development, mobile app development, digital marketing, content writing, graphic design, or other IT/ITES work; (2) your client is outside Pakistan; and (3) payment is received in foreign currency via a bank transfer. PSEB's registered services list includes software houses, freelancers, and digital agencies. Visit pseb.org.pk for the complete eligibility criteria and registration process.",
  },
];

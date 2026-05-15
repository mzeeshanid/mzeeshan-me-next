import { grid, stack } from "styled-system/patterns";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import myContributionData from "@/data/home/myContributionData";
import MyOpenSourceContributionItem from "./MyOpenSourceContributionItem";

const MyOpenSourceContribution: React.FC = () => {
  const contributions = myContributionData();

  return (
    <section className={stack({ align: "center", gap: "4" })}>
      <SectionHeader textAlign="center" headline="Open Source Contributions" />
      <div className={grid({ w: "full", columns: { base: 1, lg: 2 }, gap: "4" })}>
        {contributions.map((contribution, idx) => (
          <MyOpenSourceContributionItem key={idx} contribution={contribution} />
        ))}
      </div>
    </section>
  );
};

export default MyOpenSourceContribution;

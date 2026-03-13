import MyAppHome from "@/components/MyApp/Home/MyAppHome";
import { mzVisitsData } from "@/data/myApps/mzVisits/mzVisitsData";
import React from "react";

type Props = {};

const MZVisitsHome: React.FC<Props> = (props: Props) => {
  return <MyAppHome appData={mzVisitsData} />;
};

export default MZVisitsHome;

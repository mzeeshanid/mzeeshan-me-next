import MyAppHome from "@/components/MyApp/Home/MyAppHome";
import { mzFileManageData } from "@/data/myApps/mzFileManage/mzFileManageData";
import React from "react";

type Props = {};

const MZFileManageHome: React.FC<Props> = (props: Props) => {
  return <MyAppHome appData={mzFileManageData} />;
};

export default MZFileManageHome;

import React from "react";
import MyApp from "../src/components/PersonalAppsTemplate/MyApp";
import MZfileManageData from "../src/data/mzfileManageData";

export default function MZFileManage() {
  const appData = MZfileManageData();
  return <MyApp appData={appData} />;
}

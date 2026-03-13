import MyAppHome from "@/components/MyApp/Home/MyAppHome";
import { mz100Data } from "@/data/myApps/mz100/mz100Data";
import React from "react";

type Props = {};

const MZ100Home: React.FC<Props> = (props: Props) => {
  return <MyAppHome appData={mz100Data} />;
};

export default MZ100Home;

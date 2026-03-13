import MyAppHome from "@/components/MyApp/Home/MyAppHome";
import { mzPlayerHDData } from "@/data/myApps/mzPlayerHD/mzPlayerHDData";

type Props = {};

const MZPlayerHDHome = (props: Props) => {
  return <MyAppHome appData={mzPlayerHDData} />;
};

export default MZPlayerHDHome;

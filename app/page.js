import PortfolioClient from "../components/PortfolioClient";
import defaultData from "../data/profile.json";

export default function Home() {
  return <PortfolioClient defaultData={defaultData} />;
}

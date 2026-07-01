import AdminClient from "../../components/AdminClient";
import defaultData from "../../data/profile.json";

export const metadata = {
  title: "Admin | Portafolio"
};

export default function AdminPage() {
  return <AdminClient defaultData={defaultData} />;
}

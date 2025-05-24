import DashboardClient from "./DashboardClient";
import { getProducts } from "@/services/product";

export default async function DashboardPage() {
  const data = await getProducts();
  return (
    <DashboardClient data={data} />
  )
}

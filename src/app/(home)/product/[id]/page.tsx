import { getProduct } from "@/services/product";
import ProductItem from "./ProductItem";

export default async function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getProduct(id);

  return <ProductItem data={data} />;
}

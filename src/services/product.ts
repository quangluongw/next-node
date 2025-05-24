import axiosClient from "@/lib/axios";
import { AxiosErrorResponse } from "@/types/axiosError";
import { inputProducts } from "@/types/inputProduct";
import { toast } from "sonner";

export const getProducts = async () => {
  const res = await axiosClient("/products");
  return res.data;
};
export const getProduct = async (id: string) => {
  const res = await axiosClient(`/product/${id}`);
  return res.data;
};
export const addProduct = async (data:inputProducts) => {
  try {
    const res = await axiosClient.post(`/products`, data);
    return res.data;
  }catch (error: unknown) {
    if (isAxiosErrorResponse(error)) {
      toast(error.response?.data?.message || "Thêm thất bại");
    } else {
      toast("Thêm thất bại");
    }
    return null;
  }
};
function isAxiosErrorResponse(error: unknown): error is AxiosErrorResponse {
  return typeof error === "object" && error !== null && "response" in error;
}
export const deleteProduct = async (id: string) => {
  const res = await axiosClient.delete(`products/${id}`)
  return res.data;
};

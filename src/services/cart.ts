import axiosClient from "@/lib/axios";
import { Cart } from "@/types/cart";
import { toast } from "sonner";
type quantity={
  quantity:number
}
export const addCart = async (id: string, data: Cart) => {
  try {
    const res = await axiosClient.post(`/cart/${id}`, data);
    toast.success("Thêm giỏ hàng thành công");
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getCarts = async (id: string) => {
  try {
    const res = await axiosClient(`/cart/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const deleteCart = async (id: string) => {
  try {
    const res = await axiosClient.delete(`/cart/${id}`);
    toast.success("Xóa thành công")
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const updateCart = async (id: string,data:quantity) => {
  try {
    const res = await axiosClient.patch(`/cart/${id}`,data);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
import axiosClient from "@/lib/axios";
import { Cart } from "@/types/cart";

export const addCart = async (id:string,data:Cart) => {
    try {
        const res=await axiosClient.post(`/cart/${id}`,data);
        return res.data
    } catch (error) {
        console.log(error);
        
    }
};

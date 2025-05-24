import axiosClient from "@/lib/axios";
import { toast } from "sonner";

export const logout = async () => {
    try {
      await axiosClient.post("/logout");
      // Xóa local data, redirect login
      localStorage.clear();
      window.location.href = "/login";
      toast.success("Đăng xuất thành công")
    } catch (error) {
      console.error("Logout thất bại:", error);
    }
    
  };
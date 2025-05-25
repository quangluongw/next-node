import axiosClient from "@/lib/axios";
import { AxiosErrorResponse } from "@/types/axiosError";
import { toast } from "sonner";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: string;
  token: string;
}

export const loginWithEmail = async ({
  email,
  password,
}: LoginCredentials): Promise<void | null> => {
  try {
    const res = await axiosClient.post<LoginResponse>(
      "/login",
      { email, password },
      { withCredentials: true }
    );
    
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);
    toast("Đăng nhập thành công");
  } catch (error: unknown) {
    if (isAxiosErrorResponse(error)) {
      toast(error.response?.data?.message || "Đăng nhập thất bại");
    } else {
      toast("Đăng nhập thất bại");
    }
    return null;
  }
};

function isAxiosErrorResponse(error: unknown): error is AxiosErrorResponse {
  return typeof error === "object" && error !== null && "response" in error;
}

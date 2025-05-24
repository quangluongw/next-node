import axios from "axios";
import Cookies from "js-cookie"; // để cập nhật accessToken nếu bạn lưu bằng cookie JS

export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/refresh-token`,
      {},
      { withCredentials: true }
    );

    const { accessToken } = response.data;

    Cookies.set("accessToken", accessToken, { path: "/" });

    return accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};

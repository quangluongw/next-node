"use client";

import React, { useEffect, useState } from "react";
import { deleteCart, getCarts, updateCart } from "@/services/cart";
import Cart from "./Cart";
import { CartItem } from "@/types/cart";
type CartData = {
  data: CartItem[];
};
export default function Page() {
  const [data, setData] = useState<CartData>({data:[]});
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const userString = localStorage.getItem("user") || "";
      const user = JSON.parse(userString);
      if (user && user._id) {
        const res = await getCarts(user._id);
        setData(res);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu user/cart:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchCart();
  }, []);
  const handleDelete = async (itemId: string): Promise<void> => {
    await deleteCart(itemId);
    fetchCart()
  };
  const handleUpdate = async (itemId: string, quantity: number): Promise<void> => {
    const result = await updateCart(itemId, { quantity });
    if (result) {
      const updatedData = data.data.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      );
      setData({ ...data, data: updatedData });
    }
  };
  if (loading) return <div>Đang tải giỏ hàng...</div>;

  return (
    <div>
      <Cart
        cartItems={data}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

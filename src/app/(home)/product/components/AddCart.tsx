"use client";

import { addCart } from "@/services/cart";
import { Button } from "antd";
export default function AddCart({
  id,
  quantity,
}: {
  id: string;
  quantity: number;
}) {
  const userString = localStorage.getItem("user") || "";
  const user = JSON.parse(userString);

  const addtocart = () => {
    const data = {
      productid: id,
      quantity: quantity,
    };

    addCart(user._id, data);
  };
  return (
    <div>
      <Button className="w-full" onClick={addtocart}>
        Add To Cart
      </Button>
    </div>
  );
}

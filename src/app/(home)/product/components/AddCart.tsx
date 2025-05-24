"use client";

import { addCart } from "@/services/cart";
import { toast } from "sonner";

export default function AddCart({
  id,
  quantity,
}: {
  id: string;
  quantity: number;
}) {
  const userid = localStorage.getItem("user") || "";
  const addtocart = () => {
    const data = {
      productid: id,
      quantity: quantity,
    };

    addCart(userid, data);
    toast("Thành công");
  };
  return (
    <div>
      <button onClick={addtocart}>Add To Cart</button>
    </div>
  );
}

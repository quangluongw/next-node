import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus,faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from "antd";
import React from "react";

export default function Quantity({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (value: number) => void;
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-medium">Số lượng</h3>
      <div className="flex items-center gap-3">
        <Button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          <FontAwesomeIcon icon={faMinus}  className="h-4 w-4" />
        </Button>
        <span className="w-12 text-center font-medium">{quantity}</span>
        <Button onClick={() => setQuantity(quantity + 1)}>
        <FontAwesomeIcon icon={faPlus}  className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatVND } from "@/utils/format";
import { CartItem } from "@/types/cart";
interface CartData {
  data: CartItem[];
}
interface CartProps {
  cartItems: CartData;
  handleDelete: (id: string) => Promise<void>;
  handleUpdate: (id: string, quantity: number) => void;
}
export default function Cart({
  cartItems,
  handleDelete,
  handleUpdate,
}: CartProps) {
  
  return (
    <div className=" py-8">
      <div className=" mx-auto px-4">
        <div className="mb-8">
          <div
            className="inline-flex items-center text-blue-600 hover:text-blue-700 cursor-pointer mb-4 transition-colors"
            onClick={() => window.history.back()}
          >
            <span className="text-sm font-medium">Tiếp tục mua sắm</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">
              Giỏ hàng của bạn
            </h1>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {cartItems?.data?.length} sản phẩm
            </span>
          </div>
        </div>

        {!cartItems?.data?.length ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Giỏ hàng trống
            </h2>
            <p className="text-gray-600 mb-8">
              Hãy thêm một số sản phẩm vào giỏ hàng của bạn
            </p>
            <div className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer inline-block transition-colors">
              Khám phá sản phẩm
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Sản phẩm trong giỏ
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {cartItems?.data?.map(({_id,quantity, product: { imageUrl,name,price}}: CartItem) => (
                    <div key={_id} className="p-6">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <button onClick={() => handleDelete(_id)}>
                            X
                          </button>
                          <div className="flex-shrink-0">
                            <Image
                              src={imageUrl}
                              alt={name}
                              width={100}
                              height={100}
                              className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                          <div className="flex-1 min-w-0 ">
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                              {name}
                            </h3>
                            <span>{formatVND(price)}</span>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                                  <FontAwesomeIcon
                                    icon={faMinus}
                                    className="h-4 w-4"
                                    onClick={() =>
                                      quantity > 1 &&
                                      handleUpdate(_id,quantity - 1)
                                    }
                                  />
                                </div>
                                <span className="w-8 text-center font-medium">
                                  {quantity}
                                </span>
                                <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                                  <FontAwesomeIcon
                                    icon={faPlus}
                                    onClick={() =>
                                      handleUpdate(_id, quantity + 1)
                                    }
                                    className="h-4 w-4"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">
                            {formatVND(price * quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm sticky top-8">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Tóm tắt đơn hàng
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Giá tiền</span>
                    {/* <span>{formatVND(cartItems.totalPrice)}</span> */}
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span className="text-green-600">Miễn phí</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Tổng cộng</span>
                      {/* {formatVND(cartItems.totalPrice)} */}
                    </div>
                  </div>
                  <div className="pt-4 space-y-3">
                    <div className="bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-medium cursor-pointer transition-colors">
                      Tiến hành thanh toán
                    </div>
                    <div className="border border-gray-300 hover:border-gray-400 text-gray-700 text-center py-3 px-4 rounded-lg font-medium cursor-pointer transition-colors">
                      Mua ngay với PayPal
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 text-center pt-2">
                    Bằng việc tiến hành thanh toán, bạn đồng ý với{" "}
                    <span className="text-blue-600 cursor-pointer hover:underline">
                      Điều khoản sử dụng
                    </span>{" "}
                    và{" "}
                    <span className="text-blue-600 cursor-pointer hover:underline">
                      Chính sách bảo mật
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm mt-6">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Mã giảm giá
                    </h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Nhập mã giảm giá"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors">
                        Áp dụng
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

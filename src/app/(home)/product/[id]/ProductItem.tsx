"use client"
import { formatVND } from "@/utils/format";
import Image from "next/image";
import { useState } from "react";
import Quantity from "../components/Quantity";
import AddCart from "../components/AddCart";
interface productitem {
  data: {
    imageUrl: string;
    price: number;
    name: string;
    caterori: {
      name: string;
    };
    _id: string;
    description: string;
    variants: [{ size: string; color: string }];
  };
}
export default function ProductDetail({ data }: { data: productitem }) {
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <div className="">
      <div className=" mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <span>Trang chủ</span>
          <span>/</span>
          <span>{data.data.caterori?.name}</span>
          <span>/</span>
          <span className="text-gray-900">{data.data.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden border">
              <Image
                src={data.data.imageUrl}
                alt="Áo Thun Premium Cotton"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            {/* <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  className="aspect-square bg-white rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors"
                >
                  <Image
                    src={`/placeholder.svg?height=150&width=150`}
                    alt={`Hình ảnh ${i}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div> */}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {data.data.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-red-600">
                {formatVND(data.data.price)}
              </span>
              {/* <Badge variant="destructive">-25%</Badge> */}
            </div>

            {/* Size Selection */}
            {}
            <div className="space-y-3">
              <label className="text-base font-medium">Kích thước</label>
              <div className="flex space-x-3">
                {data.data.variants.map((item, index) => (
                  <label
                    key={index}
                    className="border rounded-md px-4 py-2 cursor-pointer hover:border-blue-500 transition-colors [&:has(:checked)]:border-blue-500 [&:has(:checked)]:bg-blue-50"
                  >
                    <div className="sr-only">{item.size}</div>
                    <span className="font-medium">{item.size}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-base font-medium">Kích thước</label>
              <div className="flex space-x-3">
                {data.data.variants.map((item, index) => (
                  <label
                    key={index}
                    className="border rounded-md px-4 py-2 cursor-pointer hover:border-blue-500 transition-colors [&:has(:checked)]:border-blue-500 [&:has(:checked)]:bg-blue-50"
                  >
                    <div className="sr-only">{item.color}</div>
                    <span className="font-medium">{item.color}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Quantity */}
            <Quantity quantity={quantity} setQuantity={setQuantity} />
            {/* Action Buttons */}
            <AddCart id={data.data?._id} quantity={quantity} />
            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                {/* <Truck className="w-5 h-5 text-green-600" /> */}
                <div>
                  <p className="font-medium text-sm">Miễn phí vận chuyển</p>
                  <p className="text-xs text-gray-600">Đơn hàng từ 500k</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {/* <Shield className="w-5 h-5 text-blue-600" /> */}
                <div>
                  <p className="font-medium text-sm">Bảo hành chính hãng</p>
                  <p className="text-xs text-gray-600">12 tháng</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {/* <RotateCcw className="w-5 h-5 text-orange-600" /> */}
                <div>
                  <p className="font-medium text-sm">Đổi trả dễ dàng</p>
                  <p className="text-xs text-gray-600">Trong 30 ngày</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {/* <MessageCircle className="w-5 h-5 text-purple-600" /> */}
                <div>
                  <p className="font-medium text-sm">Hỗ trợ 24/7</p>
                  <p className="text-xs text-gray-600">Tư vấn miễn phí</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        {/* <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Mô tả sản phẩm</TabsTrigger>
              <TabsTrigger value="specifications">Thông số kỹ thuật</TabsTrigger>
              <TabsTrigger value="reviews">Đánh giá (128)</TabsTrigger>
              <TabsTrigger value="shipping">Vận chuyển</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="bg-white rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-semibold">Mô tả chi tiết sản phẩm</h3>
                <div className="prose max-w-none">
                  <p>
                    Áo thun Premium Cotton được thiết kế với chất liệu cotton 100% cao cấp, mang lại cảm giác mềm mại và
                    thoải mái tối đa cho người mặc. Sản phẩm có thiết kế hiện đại, phù hợp với nhiều phong cách khác
                    nhau.
                  </p>
                  <p>Đặc điểm nổi bật:</p>
                  <ul>
                    <li>Chất liệu cotton 100% cao cấp, thấm hút mồ hôi tốt</li>
                    <li>Thiết kế basic, dễ phối đồ</li>
                    <li>Form áo vừa vặn, không bị rộng hay bó</li>
                    <li>Đường may chắc chắn, bền đẹp theo thời gian</li>
                    <li>Màu sắc không phai sau nhiều lần giặt</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Thông số kỹ thuật</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Chất liệu:</p>
                    <p className="text-gray-600">Cotton 100%</p>
                  </div>
                  <div>
                    <p className="font-medium">Xuất xứ:</p>
                    <p className="text-gray-600">Việt Nam</p>
                  </div>
                  <div>
                    <p className="font-medium">Kiểu dáng:</p>
                    <p className="text-gray-600">Regular fit</p>
                  </div>
                  <div>
                    <p className="font-medium">Cổ áo:</p>
                    <p className="text-gray-600">Cổ tròn</p>
                  </div>
                  <div>
                    <p className="font-medium">Tay áo:</p>
                    <p className="text-gray-600">Tay ngắn</p>
                  </div>
                  <div>
                    <p className="font-medium">Độ dày:</p>
                    <p className="text-gray-600">Vừa phải</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Đánh giá từ khách hàng</h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b pb-4">
                      <div className="flex items-center space-x-4 mb-2">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div>
                          <p className="font-medium">Nguyễn Văn A</p>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">
                        Áo rất đẹp và chất lượng tốt. Vải mềm mại, mặc rất thoải mái. Sẽ ủng hộ shop tiếp!
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Thông tin vận chuyển</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Miễn phí vận chuyển:</p>
                    <p className="text-gray-600">Áp dụng cho đơn hàng từ 500.000₫</p>
                  </div>
                  <div>
                    <p className="font-medium">Thời gian giao hàng:</p>
                    <p className="text-gray-600">2-3 ngày làm việc (nội thành), 3-5 ngày (ngoại thành)</p>
                  </div>
                  <div>
                    <p className="font-medium">Phí vận chuyển:</p>
                    <p className="text-gray-600">30.000₫ (nội thành), 50.000₫ (ngoại thành)</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div> */}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Table } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteProduct } from "@/services/product";
import { products } from "@/types/product";

type Props = {
  data: products[];
};

export default function DashboardClient({ data }: Props) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    // console.log(id);

    try {
      await deleteProduct(id);
      router.refresh();
      alert("xóa thanh cong");
    } catch (error) {
      console.log(error);
    }
  };
  const dataSource:products[] = data.map((item) => ({
    _id: item._id,
    name: item.name,
    imageUrl: item.imageUrl,
    price:item.price
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (src: string) => (
        <Image src={src} alt="img" width={100} height={100} />
      ),
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (_: unknown, record: products) => (
        <div className="flex items-center gap-3">
          <Link href={`admin/updateBlog/${record._id}`}>Edit</Link>
          <button onClick={() => handleDelete(record._id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-4">
      <div className="flex justify-end">
        <Link href="admin/addblog">Add blog</Link>
      </div>

      <Table dataSource={dataSource} columns={columns} className="mt-10" />
    </div>
  );
}

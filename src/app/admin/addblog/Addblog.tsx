"use client";
import React, {  useState } from "react";
import "../style.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "antd";
// import { addBlog } from "@/services/blog";
import { useRouter } from "next/navigation";
import Upload from "@/Upload/upload";
// import { getTags } from "@/services/tag";
// import Image from "next/image";
import { addProduct } from "@/services/product";
import { inputProducts } from "@/types/inputProduct";


export default function Addblog() {
  const [imageUpload, setImageUpload] = useState("");
  // const [tags, setTags] = useState<Tag[]>([]);
  // const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // const [preview, setPreview] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<inputProducts>();

  const router = useRouter();

  // useEffect(() => {
  //   const fetchTags = async () => {
  //     try {
  //       const result = await getTags();
  //       setTags(result);
  //     } catch (error) {
  //       console.error("Failed to fetch tags", error);
  //     }
  //   };
  //   fetchTags();
  // }, []);

  const onSubmit: SubmitHandler<inputProducts> = async (value) => {
    const blogData = {
      ...value,
      imageUrl: imageUpload,
      caterori: "67419639038d9dcbdec62e5e",
    };
  
    const result = await addProduct(blogData);
    if (!result) {
      return;
    }
  
    router.refresh();
    router.push("/admin");
  };
  // const handChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
  //  const file= e.target.files[0]
  //  if (!file) return;
  //   const objectUrl=URL.createObjectURL(file);
  //   console.log(objectUrl);
  //   setPreview(objectUrl)
  // }
  return (
    <div className="modal mt-20 w-full m-auto">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center w-full text-2xl">Add Product</h2>
        <div className="credit-card-info--form">
          <div className="input_container">
            <label className="input_label">name</label>
            <input
              className="input_field"
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "name is required" })}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <Upload setimages={setImageUpload} />
          {/* <div className="input_container">
            <label className="input_label">Upload Image</label>
            <input type="file" accept="image/*" onChange={(e)=>handChange(e)} />
            <Image
              src={preview}
              width={300}
              height={300}
              className="aspect-video w-full rounded-md object-cover mt-2"
              alt="Uploaded preview"
            />
          </div> */}
          <div className="input_container">
            <label className="input_label">price</label>
            <input
              className="input_field"
              type="text"
              placeholder="Enter your price"
              {...register("price", {
                required: "price is required",
              })}
            />
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </div>

          <div className="input_container">
            <label className="input_label"> description</label>
            <textarea
              className="input_field"
              placeholder="Enter your  description"
              rows={4}
              {...register("description", {
                required: " description is required",
              })}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          {/* 
          <div className="input_container">
            <label className="input_label">Category</label>
            <select
              className="border-2 border-gray-200 p-2 w-full"
              {...register("category_id", { required: "Category is required" })}
            >
              <option value="">Select a category</option>
              {categories.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <span className="text-red-500">{errors.category_id.message}</span>
            )}
          </div> */}

          {/* <div className="input_container">
            <label className="input_label">Tags</label>
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                value={selectedTags}
                onChange={(value) => setSelectedTags(value)}
                options={tags.map((item) => ({
                  label: item.tag,
                  value: item.id,
                }))}
              />
            </Space>
          </div> */}
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

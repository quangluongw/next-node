"use client";
import React, { useEffect, useState } from "react";
import { Upload, Image } from "antd";
import type { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import type { RcFile } from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "sonner";
interface UploadImageProps {
  setimages: (url: string) => void;
  images?: string;
}
interface FileResponse {
  secure_url?: string;
  url?: string;
}

export default function UploadImage({ setimages, images }: UploadImageProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  // Cập nhật fileList ban đầu nếu có images từ props
  useEffect(() => {
    if (images) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: images,
        },
      ]);
    }
  }, [images]);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleUpload = (info: UploadChangeParam<UploadFile<FileResponse>>) => {
    let newFileList = [...info.fileList];

    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.secure_url || file.response.url;
      }
      return file;
    });

    setFileList(newFileList);

    // Gọi hàm setimages được truyền từ props
    const uploadedImageUrl = newFileList[0]?.url;
    if (uploadedImageUrl) {
      setimages(uploadedImageUrl);
    }
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      toast.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const imageToShow = fileList.length === 0 ? images : previewImage;

  return (
    <div>
      <Upload
        action="https://api.cloudinary.com/v1_1/dkrcsuwbc/image/upload"
        listType="picture-card"
        data={{ upload_preset: "image1" }}
        onPreview={handlePreview}
        onChange={handleUpload}
        beforeUpload={beforeUpload}
        fileList={fileList}
      >
        {fileList.length >= 1 ? null : (
          <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload Image</div>
          </button>
        )}
      </Upload>

      <Image
        wrapperStyle={{ display: "none" }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
          afterOpenChange: (visible) => {
            if (!visible) setPreviewImage("");
          },
        }}
        src={imageToShow}
        alt="Preview"
      />
    </div>
  );
}

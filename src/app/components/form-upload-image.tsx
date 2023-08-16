"use client";
import { Form, FormItemProps, Upload } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { NamePath } from "antd/es/form/interface";
import { UploadFile } from "antd/es/upload/interface";
import React, { useRef } from "react";
import { cn } from "@/common/utils";

interface Props extends FormItemProps {
  className?: string;
  name?: NamePath | undefined;
}

function FormUploadImage({ name, className, ...props }: Props) {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const onceRef = useRef(true);

  return (
    <Form.Item
      {...props}
      className={cn("w-[224px]", className)}
      name={name}
      getValueProps={(e) => {
        if (onceRef.current && e)
          setFileList([{ url: e, name: "image.png", uid: "-1" }]);
        onceRef.current = false;
        return e;
      }}
      getValueFromEvent={(e) => {
        if (Array.isArray(e)) return e;
        setFileList(e?.fileList);

        // this component will return browser's url
        // please upload to 3th party api
        return e.file.originFileObj
          ? URL.createObjectURL(e.file.originFileObj)
          : "";
      }}
    >
      <Upload
        maxCount={1}
        accept="image/*"
        fileList={fileList}
        listType="picture-card"
      >
        <div className="text-[#8F9499]">
          <FileImageOutlined className="text-xl" />
          <p className="mt-[10px] uppercase text-[#8F9499] text-body2">
            tải ảnh lên
          </p>
        </div>
      </Upload>
    </Form.Item>
  );
}
export default FormUploadImage;

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function UploadImageButton({ className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "mt-2 flex flex-col justify-center items-center rounded-lg border-dashed border border-[#ccc] hover:border-[#8F9499] w-[100px] h-[100px] bg-[#E9E9E9]",
        className
      )}
      {...props}
    >
      <FileImageOutlined className="text-xl text-[#8F9499] " />
      <p className="mt-[10px] uppercase text-[#8F9499] text-body2">
        tải ảnh lên
      </p>
    </button>
  );
}

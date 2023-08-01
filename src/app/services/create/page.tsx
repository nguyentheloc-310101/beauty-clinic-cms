"use client";
import { IDoctor } from "@/common/types";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Tooltip,
  Upload,
  UploadFile,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import querystring from "query-string";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/services";
import { getIdFromSupabaseStorage } from "@/common/utils";

interface IFormDoctor extends IDoctor {
  imageFile: any[];
}
export default function Create() {
  const { data, isEdited = false } = querystring.parse(
    useSearchParams().toString()
  );

  let initialDoctor = {} as IFormDoctor;
  try {
    initialDoctor = JSON.parse(data as string) as IFormDoctor;
    initialDoctor.imageFile = [
      {
        uid: "-1",
        name: initialDoctor.name,
        status: "done",
        url: initialDoctor.image,
      } as UploadFile,
    ];
  } catch (error) {
    console.log(error);
  }

  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (doctor: IFormDoctor) => {
    messageApi.open({
      type: "loading",
      content: "Đang " + (isEdited ? "lưu thay đổi..." : "thêm mới..."),
    });
    let image;
    if (doctor.imageFile?.[0]?.originFileObj) {
      const imageKey = "doctors/" + uuidv4() + ".png";
      await supabase.storage
        .from("aura")
        .upload(imageKey, doctor.imageFile[0].originFileObj);
      image = supabase.storage.from("aura").getPublicUrl(imageKey)
        .data.publicUrl;
    }

    const DTO = {
      name: doctor.name,
      experience_year: doctor.experience_year,
      image: image ?? doctor.image,
      major: doctor.major,
      desc_doctor: doctor.desc_doctor,
    };

    if (isEdited) {
      const { error } = await supabase.storage
        .from("aura")
        .remove([getIdFromSupabaseStorage(initialDoctor.image)]);
      if (error) console.log(error);
      const { error: error1 } = await supabase
        .from("doctors")
        .update(DTO)
        .eq("id", initialDoctor.id);
      if (error1) console.log("if", error1);
    } else {
      await supabase.from("doctors").insert(DTO);
    }

    router.back();
    messageApi.destroy();
    message.success("Thành công!");
  };
  return (
    <>
      {contextHolder}
      <header className="flex p-2 gap-4">
        <Tooltip title="Trở về">
          <Button
            shape="circle"
            type="text"
            icon={<LeftOutlined />}
            onClick={router.back}
          />
        </Tooltip>
        <h2>
          {isEdited
            ? "Chỉnh sửa thông tin bác sĩ"
            : "Thêm mới thông tin bác sĩ"}
        </h2>
      </header>
      <Form
        labelCol={{ span: 6 }}
        //wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={initialDoctor}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Avatar"
          valuePropName="fileList"
          name="imageFile"
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            accept="image/*"
            fileList={[{ url: initialDoctor.image }] as any}
          >
            Tải lên
          </Upload>
        </Form.Item>
        <Form.Item label="Họ tên:" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Chuyên ngành:" name="major">
          <Input />
        </Form.Item>
        <Form.Item label="Số năm kinh nghiệm:" name="experience_year">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Thông tin bác sĩ:" name="desc_doctor">
          <TextArea rows={4} />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="block ml-auto">
          {isEdited ? "Lưu thay đổi" : "Tạo mới"}
        </Button>
      </Form>
    </>
  );
}

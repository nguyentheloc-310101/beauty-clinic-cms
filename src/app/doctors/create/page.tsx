"use client";
import { IDoctor, IService } from "@/common/types";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Tooltip,
  Upload,
  UploadFile,
  message,
} from "antd";
const { Option } = Select;

import TextArea from "antd/es/input/TextArea";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import querystring from "query-string";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/services";
import { getIdFromSupabaseStorage } from "@/common/utils";
import { useFetch } from "@/common/hooks";

interface IFormDoctor extends IDoctor {
  imageFile: any[];
}
export default function Create() {
  const { value: services } = useFetch<IService[]>(() =>
    supabase.from("services").select()
  );
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
    try {
      if (isEdited) updateDoctor(initialDoctor.id, doctor);
      else createDoctor(doctor);
      message.success("Thành công!");
    } catch (error) {
      message.error("Xảy ra lỗi!");
    }
    messageApi.destroy();
    router.push("/doctors");
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
          <InputNumber min={0} max={50} />
        </Form.Item>
        <Form.Item label="Thông tin bác sĩ:" name="desc_doctor">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Thuộc dịch vụ:" name="service_id">
          <Select defaultValue={initialDoctor.service_id}>
            {services?.map((service: IService, i: number) => (
              <Option value={service.id} key={i}>
                {service.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit" className="block ml-auto">
          {isEdited ? "Lưu thay đổi" : "Tạo mới"}
        </Button>
      </Form>
    </>
  );
}

async function createDoctor(doctor: IFormDoctor) {
  const imageKey = "doctors/" + uuidv4() + ".png";
  await supabase.storage
    .from("aura")
    .upload(imageKey, doctor.imageFile[0].originFileObj);

  await supabase.from("doctors").insert({
    name: doctor.name,
    experience_year: doctor.experience_year,
    image: supabase.storage.from("aura").getPublicUrl(imageKey).data.publicUrl,
    major: doctor.major,
    desc_doctor: doctor.desc_doctor,
    service_id: doctor.service_id,
  });
}

async function updateDoctor(id: string, doctor: IFormDoctor) {
  let image = doctor.image;
  if (doctor.imageFile?.[0].originFileObj) {
    await supabase.storage
      .from("aura")
      .remove([getIdFromSupabaseStorage(doctor.image)]);

    const imageKey = "doctors/" + uuidv4() + ".png";
    await supabase.storage
      .from("aura")
      .upload(imageKey, doctor.imageFile[0].originFileObj);
    image = supabase.storage.from("aura").getPublicUrl(imageKey).data.publicUrl;
  }

  await supabase
    .from("doctors")
    .update({
      name: doctor.name,
      experience_year: doctor.experience_year,
      image,
      major: doctor.major,
      desc_doctor: doctor.desc_doctor,
      service_id: doctor.service_id,
    })
    .eq("id", id);
}

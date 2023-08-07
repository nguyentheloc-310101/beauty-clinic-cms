"use client";
import { IDoctor } from "@/common/types";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import querystring from "query-string";
import Section from "@components/section";
import FormUploadImage from "@/app/components/form-upload-image";
import HelperText from "@/app/components/helper-text";
import Steps from "./steps";

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
  } catch (error) {
    console.log(error);
  }

  const router = useRouter();

  const onFinish = async (doctor: IFormDoctor) => {
    router.push("/services");
  };
  return (
    <div className="flex flex-col justify-between h-full">
      <Form
        layout="vertical"
        initialValues={initialDoctor}
        onFinish={onFinish}
        className="overflow-auto p-6 flex flex-col gap-9"
      >
        <Section title="Giới thiệu dịch vụ" className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            <FormUploadImage name={"image"} />
            <Form.Item name={"name"} label="Tên dịch vụ">
              <Input placeholder="Nhập tên dịch vụ" />
              <HelperText>Tên dịch vụ sẽ là title của bài viết</HelperText>
            </Form.Item>
            <Form.Item name={"price"} label="Giá chỉ từ">
              <Input placeholder="Chỉ nhập số" />
              <HelperText>Có thể bỏ qua mục này</HelperText>
            </Form.Item>
          </div>
          <Form.Item label="Nội dung giới thiệu dịch vụ">
            <TextArea placeholder=" Typing" rows={13} />
          </Form.Item>
        </Section>
        <Section optional title="Đội ngũ bác sĩ">
          <Form.Item>
            <Input placeholder="Chọn bác sĩ muốn hiển thị" />
          </Form.Item>
          <HelperText>
            Mục này sẽ hiển thị tại <br />
            “Đội ngũ Y Bác sĩ uy tín”
          </HelperText>
        </Section>
        <Section title="Các bước điều trị">
          <Steps name="steps" />
        </Section>
        <Section title="Giới thiệu dịch vụ khác" className="w-1/2">
          <Form.Item>
            <Input placeholder="Chọn dịch vụ muốn link" />
          </Form.Item>
          <HelperText>
            Mục này sẽ hiển thị tại “Dịch vụ khác tại Thẩm mỹ Aura”
          </HelperText>
        </Section>
      </Form>
      <footer className="flex p-6 justify-end [&>*]:w-40 gap-[10px] bg-white">
        <Button>Hoàn tác</Button>
        <Button type="primary">
          {isEdited ? "Lưu điều chỉnh" : "Đăng bài"}
        </Button>
      </footer>
    </div>
  );
}

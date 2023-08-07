"use client";
import { IService } from "@/common/types";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import querystring from "query-string";
import Section from "@components/section";
import FormUploadImage from "@/app/components/form-upload-image";
import HelperText from "@/app/components/helper-text";
import Steps from "./steps";
import { imageProcessing } from "@/common/utils";
import { supabase } from "@/services";

export default function Create() {
  const { data, isEdited = false } = querystring.parse(
    useSearchParams().toString()
  );

  let initialService = {} as IService;
  try {
    if (data) initialService = JSON.parse(data as string) as IService;
    console.log(initialService);
  } catch (error) {
    console.log(error);
  }
  const router = useRouter();
  const onFinish = async (service: IService) => {
    await imageProcessing(service, ["image"]);
    if (isEdited) {
      await supabase
        .from("services")
        .update(service)
        .eq("id", initialService.id);
    } else {
      await supabase.from("services").insert(service);
    }
    router.push("/services");
  };
  return (
    <Form
      layout="vertical"
      initialValues={initialService}
      onFinish={onFinish}
      className="flex flex-col justify-between h-full"
    >
      <div className="overflow-auto p-6 flex flex-col gap-9">
        <Section title="Giới thiệu dịch vụ" className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            <FormUploadImage name={"image"} url={initialService.image} />
            <Form.Item name={"name"} label="Tên dịch vụ">
              <Input placeholder="Nhập tên dịch vụ" />
            </Form.Item>
            <HelperText className="mt-[-8px]">
              Tên dịch vụ sẽ là title của bài viết
            </HelperText>
            <Form.Item name={"price"} label="Giá chỉ từ">
              <Input placeholder="Chỉ nhập số" />
            </Form.Item>
            <HelperText className="mt-[-8px]">Có thể bỏ qua mục này</HelperText>
          </div>
          <Form.Item label="Nội dung giới thiệu dịch vụ" name={"description"}>
            <TextArea placeholder="Typing" rows={13} />
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
      </div>
      <footer className="flex p-6 justify-end [&>*]:w-40 gap-[10px] bg-white">
        <Button>Hoàn tác</Button>
        <Button type="primary" htmlType="submit">
          {isEdited ? "Lưu điều chỉnh" : "Đăng bài"}
        </Button>
      </footer>
    </Form>
  );
}

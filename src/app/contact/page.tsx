"use client";
import { useFetch, useUpsert } from "@/common/hooks";
import { Edit } from "@/common/utils";
import { supabase } from "@/services";
import FormUploadImage from "@components/form-upload-image";
import HelperText from "@components/helper-text";
import HistoryAside from "@components/history-aside";
import FooterCustom from "@components/layout/footer/Footer";
import Loading from "@components/loading";
import Section from "@components/section";
import { IClinic, IContact } from "@types";
import { Form, Input } from "antd";
import React, { useState } from "react";
import FormSelectMultiple from "../components/form-select-multiple";

export default function Contact() {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const {
    value: contact,
    upsert,
    loading,
  } = useUpsert<IContact>("contact", ["background"]);

  async function onSubmit(value: IContact) {
    setIsUploading(true);
    await upsert(value);

    setIsUploading(false);

    await addToHistory(contact!, value);
    window.location.reload();
  }

  const { value } = useFetch<IClinic[]>(() =>
    supabase.from("clinics").select()
  );

  if (loading) return <Loading />;
  return (
    <Form
      layout="vertical"
      className="h-full flex flex-col"
      initialValues={contact!}
      onFinish={onSubmit}
    >
      <div className="flex-1 flex overflow-hidden ">
        <div className="flex flex-col gap-9 p-6 flex-1 overflow-auto">
          <Section title="Ảnh bìa">
            <FormUploadImage
              rules={[{ required: true, message: "Vui lòng chọn ảnh!" }]}
              name={"background"}
            />
          </Section>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <HelperText>Hiển thị ở phần chữ script</HelperText>
            </div>
            <div>
              <Form.Item
                label="Subtitle"
                name="subtitle"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <HelperText>Hiển thị ở phần chữ in hoa</HelperText>
            </div>
          </div>
          <Section title="Cơ sở hiển thị">
            <FormSelectMultiple
              placeholder={"Chọn cơ sở muốn hiển thị"}
              name={"clinic_ids"}
              options={
                value?.map((clinic) => ({
                  value: clinic.id,
                  label: clinic.name,
                })) ?? []
              }
            />
          </Section>
        </div>
        <HistoryAside page="contact" />
      </div>
      <FooterCustom
        leftAction={false}
        onOk={undefined}
        rightAction={true}
        textBtnRight={"Lưu"}
        isUploading={isUploading}
      />
    </Form>
  );
}

async function addToHistory(originalValue: IContact, value: IContact) {
  const edit = new Edit(originalValue, value);
  edit.compare("background", {
    scope: "Ảnh bìa",
    name: "edit",
    display: "chỉnh sửa mục",
  });
  edit.compare("title", {
    scope: "Title",
    name: "edit",
    display: "chỉnh sửa mục",
  });
  edit.compare("subtitle", {
    scope: "Subtitle",
    name: "edit",
    display: "chỉnh sửa mục",
  });
  edit.compare("clinic_ids", {
    scope: "Feedbacks của celeb",
    name: "edit",
    display: "chỉnh sửa mục",
  });

  const user = (await supabase.auth.getUser()).data.user?.id;
  const history = edit.getActions().map((action) => ({
    user,
    action,
    page: "contact",
  }));
  if (history.length != 0) await supabase.from("history").insert(history);
}

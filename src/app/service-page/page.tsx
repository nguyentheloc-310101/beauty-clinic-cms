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
import { IService, IServiceCategory, IServicePage } from "@types";
import { Form, Input } from "antd";
import React, { useState } from "react";
import FormSelectMultiple from "../components/form-select-multiple";
import TextArea from "antd/es/input/TextArea";

export default function ServicePage() {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const {
    value: servicePage,
    upsert,
    loading,
  } = useUpsert<IServicePage>("servicePage", ["background"]);

  async function onSubmit(value: IServicePage) {
    setIsUploading(true);
    await upsert(value);

    setIsUploading(false);

    await addToHistory(servicePage!, value);
    window.location.reload();
  }

  const { value: categories } = useFetch<IServiceCategory[]>(() =>
    supabase.from("service-categories").select()
  );

  const { value: services } = useFetch<IService[]>(() =>
    supabase.from("services").select()
  );
  if (loading) return <Loading />;
  return (
    <Form
      form={form}
      layout="vertical"
      className="h-full flex flex-col"
      initialValues={servicePage!}
      onFinish={onSubmit}
    >
      <div className="flex-1 flex overflow-hidden ">
        <div className="flex flex-col gap-9 p-6 flex-1 overflow-auto">
          <Section
            title="Giới thiệu dịch vụ"
            className="grid grid-cols-2 gap-3"
          >
            <div className="flex flex-col gap-3">
              <FormUploadImage required name={"background"} />
              <Form.Item
                name={"title"}
                label="Title"
                rules={[{ required: true }]}
              >
                <Input placeholder="Nhập nội dung" />
              </Form.Item>
              <HelperText className="mt-[-8px]">
                Hiển thị ở phần chữ script
              </HelperText>
              <Form.Item
                name={"subtitle"}
                label="Subtitle"
                rules={[{ required: true }]}
              >
                <Input placeholder="Nhập nội dung" />
              </Form.Item>
              <HelperText className="mt-[-8px]">
                Hiển thị ở phần chữ in hoa
              </HelperText>
            </div>
            <Form.Item
              label="Nội dung giới thiệu"
              name={"description"}
              rules={[{ required: true }]}
            >
              <TextArea placeholder="Typing" rows={13} />
            </Form.Item>
          </Section>
          <Section title="Danh mục hiển thị">
            <HelperText className="mt-[-8px] mb-2">
              Chọn những danh mục và dịch vụ để hiển thị trên website
            </HelperText>
            <div className="grid grid-cols-2 gap-3">
              <FormSelectMultiple
                label="Danh mục"
                placeholder={"Chọn danh mục muốn hiển thị"}
                name={"category_ids"}
                options={
                  categories?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  })) ?? []
                }
              />
              <FormSelectMultiple
                placeholder={"Hiển thị theo danh mục đã chọn"}
                label="Dịch vụ hiển thị"
                name={"service_ids"}
                options={
                  services
                    ?.filter((item) =>
                      form
                        ?.getFieldValue("category_ids")
                        ?.includes(item.category_id)
                    )
                    .map((item) => ({
                      value: item.id,
                      label: item.name,
                    })) ?? []
                }
              />
            </div>
          </Section>
        </div>
        <HistoryAside page="servicePage" />
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

async function addToHistory(originalValue: IServicePage, value: IServicePage) {
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

  const user = (await supabase.auth.getUser()).data.user?.id;
  const history = edit.getActions().map((action) => ({
    user,
    action,
    page: "servicePage",
  }));
  if (history.length != 0) await supabase.from("history").insert(history);
}

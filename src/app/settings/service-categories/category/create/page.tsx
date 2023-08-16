"use client";
import HelperText from "@/app/components/helper-text";
import { supabase } from "@/services";
import Modal from "@components/modal";
import { Button, Form, Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import querystring from "query-string";
import { IServiceCategory } from "@/common/types";

export default function Create() {
  const { data, isEdited = false } = querystring.parse(
    useSearchParams().toString()
  );

  let initialCategory = {} as IServiceCategory;
  try {
    if (data) {
      initialCategory = JSON.parse(data as string) as IServiceCategory;
    }
  } catch (error) {
    console.error(error);
  }
  const router = useRouter();
  const onSubmit = async (value: any) => {
    let error;
    if (isEdited)
      error = (
        await supabase
          .from("service-categories")
          .update({ name: value.name })
          .eq("id", initialCategory.id)
      ).error;
    else
      error = (
        await supabase.from("service-categories").insert({ name: value.name })
      ).error;
    if (error) console.error(error);
    else router.push("/settings/service-categories");
  };
  return (
    <Modal
      title={isEdited ? "Chỉnh sửa danh mục" : "Tạo danh mục mới"}
      className="w-[448px]"
    >
      <Form
        onFinish={onSubmit}
        layout="vertical"
        initialValues={initialCategory}
      >
        <Form.Item name="name" label="Tên danh mục">
          <Input placeholder=" Nhập tên danh mục" />
        </Form.Item>
        <HelperText>
          Danh mục mới tạo không được trùng với tên danh mục đang có sẵn.
        </HelperText>
        <footer className="grid grid-cols-2 gap-6 mt-6">
          <Button onClick={() => router.back()}>Hoàn tác</Button>
          <Button type="primary" htmlType="submit">
            {isEdited ? "Chỉnh sửa" : "Thêm mới"}
          </Button>
        </footer>
      </Form>
    </Modal>
  );
}

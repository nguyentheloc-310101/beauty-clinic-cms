"use client";
import FormSelect from "@components/form-select";
import HelperText from "@components/helper-text";
import { supabase } from "@/services";
import Modal from "@components/modal";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useFetch } from "@/common/hooks";
import { IServiceCategory } from "@/common/types";

export default function Create() {
  const router = useRouter();
  const onSubmit = async (value: any) => {
    const { error } = await supabase
      .from("services")
      .insert({ name: value.name, category_id: value.category_id });
    if (error) console.error(error);
    else router.push("/settings/service-categories");
  };
  const { value } = useFetch<IServiceCategory[]>(() =>
    supabase.from("service-categories").select()
  );
  const categories =
    value?.map((category) => ({
      value: category.id,
      label: category.name,
    })) ?? [];

  return (
    <Modal title="Tạo danh mục mới" className="w-[448px]">
      <Form
        onFinish={onSubmit}
        layout="vertical"
        className="flex flex-col gap-6"
      >
        <FormSelect
          placeholder={"Chọn danh mục"}
          label={"Danh mục"}
          name={"category_id"}
          options={categories}
        />
        <Form.Item name="name" label="Tên dịch vụ">
          <Input placeholder="Nhập tên dịch vụ" />
        </Form.Item>
        <HelperText className="mt-[-8px]">
          Dịch vụ mới tạo không được trùng với tên dịch vụ đang có sẵn.
        </HelperText>
        <footer className="grid grid-cols-2 gap-6 ">
          <Button onClick={() => router.back()}>Hoàn tác</Button>
          <Button type="primary" htmlType="submit">
            Thêm mới
          </Button>
        </footer>
      </Form>
    </Modal>
  );
}

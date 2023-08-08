"use client";
import HelperText from "@/app/components/helper-text";
import { supabase } from "@/services";
import Modal from "@components/modal";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

export default function Create() {
  const router = useRouter();
  const onSubmit = async (value: any) => {
    const { error } = await supabase
      .from("service-categories")
      .insert({ name: value.name });
    if (error) console.error(error);
    else router.push("/settings/service-categories");
  };
  return (
    <Modal title="Tạo danh mục mới" className="w-[448px]">
      <Form onFinish={onSubmit} layout="vertical">
        <Form.Item name="name" label="Tên danh mục">
          <Input placeholder=" Nhập tên danh mục" />
        </Form.Item>
        <HelperText>
          Danh mục mới tạo không được trùng với tên danh mục đang có sẵn.
        </HelperText>
        <footer className="grid grid-cols-2 gap-6 mt-6">
          <Button onClick={() => router.back()}>Hoàn tác</Button>
          <Button type="primary" htmlType="submit">
            Thêm mới
          </Button>
        </footer>
      </Form>
    </Modal>
  );
}

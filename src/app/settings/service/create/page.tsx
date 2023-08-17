"use client";
import FormSelect from "@components/form-select";
import HelperText from "@components/helper-text";
import { supabase } from "@/services";
import Modal from "@components/modal";
import { Button, Form, Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useFetch } from "@/common/hooks";
import { IService, IServiceCategory } from "@/common/types";
import slugify from "slugify";
import querystring from "query-string";

export default function Create() {
  const { data, isEdited = false } = querystring.parse(
    useSearchParams().toString()
  );

  let initialService = {} as IService;
  try {
    if (data) {
      initialService = JSON.parse(data as string) as IService;
    }
  } catch (error) {
    console.error(error);
  }
  const router = useRouter();
  const onSubmit = async (service: IService) => {
    const tmp = {
      name: service.name,
      category_id: service.category_id,
      slug: slugify(
        categories.find((category) => category.value == service.category_id)
          ?.label +
          "--" +
          service.name,
        { lower: true }
      ),
    };
    let error;
    if (isEdited)
      error = (
        await supabase.from("services").update(tmp).eq("id", initialService.id)
      ).error;
    else error = (await supabase.from("services").insert(tmp)).error;

    if (error) console.error(error);
    else router.push("/settings/service");
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
    <Modal
      title={isEdited ? "Chỉnh sửa dịch vụ" : "Tạo danh dịch vụ"}
      className="w-[448px]"
    >
      <Form
        onFinish={onSubmit}
        initialValues={initialService}
        layout="vertical"
        className="flex flex-col gap-6"
      >
        <FormSelect
          placeholder={"Chọn danh mục"}
          label={"Danh mục"}
          name={"category_id"}
          options={categories}
          required
        />
        <Form.Item name="name" label="Tên dịch vụ" rules={[{ required: true }]}>
          <Input placeholder="Nhập tên dịch vụ" />
        </Form.Item>
        <HelperText className="mt-[-8px]">
          Dịch vụ mới tạo không được trùng với tên dịch vụ đang có sẵn.
        </HelperText>
        <footer className="grid grid-cols-2 gap-6 ">
          <Button onClick={() => router.back()}>Hoàn tác</Button>
          <Button type="primary" htmlType="submit">
            {isEdited ? "Chỉnh sửa" : "Thêm mới"}
          </Button>
        </footer>
      </Form>
    </Modal>
  );
}

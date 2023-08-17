"use client";
import HelperText from "@/app/components/helper-text";
import { supabase } from "@/services";
import Modal from "@components/modal";
import { Button, Form, Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import querystring from "query-string";
import { ICategoryTag, IServiceCategory } from "@/common/types";
import FormSelectMultiple from "@/app/components/form-select-multiple";
import { useFetch } from "@/common/hooks";

export default function Create() {
  const { data, isEdited = false } = querystring.parse(
    useSearchParams().toString()
  );

  let initialService = {} as ICategoryTag;
  try {
    if (data) {
      initialService = JSON.parse(data as string) as ICategoryTag;
    }
  } catch (error) {
    console.error(error);
  }
  let initialCategory = {} as IServiceCategory;
  try {
    if (data) {
      initialCategory = JSON.parse(data as string) as IServiceCategory;
      initialCategory = {
        ...initialCategory,
        tags: initialCategory.tags.map((tag: any) => tag?.id),
      };
    }
  } catch (error) {
    console.error(error);
  }
  const router = useRouter();
  const onSubmit = async (category: IServiceCategory) => {
    let categoryId = initialCategory.id;
    let error;
    if (isEdited)
      error = (
        await supabase
          .from("service-categories")
          .update({ name: category.name })
          .eq("id", initialCategory.id)
      ).error;
    else {
      const { data, error: error1 } = await supabase
        .from("service-categories")
        .insert({ name: category.name })
        .select()
        .single();
      error = error1;
      categoryId = data.id;
    }
    if (error) console.error(error);
    else router.push("/settings/service-categories");

    await supabase
      .from("categories-tags")
      .upsert(
        category.tags.map((tag) => ({ tag_id: tag, category_id: categoryId }))
      );
  };

  const { value } = useFetch<ICategoryTag[]>(() =>
    supabase.from("tags").select()
  );
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
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true }]}
        >
          <Input placeholder=" Nhập tên danh mục" />
        </Form.Item>

        <HelperText className="mb-6">
          Danh mục mới tạo không được trùng với tên danh mục đang có sẵn.
        </HelperText>

        <FormSelectMultiple
          label="Tags"
          placeholder={"Chọn tag phù hợp"}
          name={"tags"}
          required
          options={
            value?.map((tag) => ({
              value: tag.id,
              label: tag.name,
            })) ?? []
          }
        />
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

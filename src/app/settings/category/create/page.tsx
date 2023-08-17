"use client";
import HelperText from "@/app/components/helper-text";
import { supabase } from "@/services";
import Modal from "@components/modal";
import { Button, Form, Input, InputNumber } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import querystring from "query-string";
import { ICategoryTag, IServiceCategory } from "@/common/types";
import FormSelectMultiple from "@/app/components/form-select-multiple";
import { useFetch } from "@/common/hooks";
import FormUploadImage from "@/app/components/form-upload-image";
import { uploadImages } from "@/common/utils";

export default function Create() {
  const [isUploading, setIsUploading] = useState<boolean>(false);
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
    setIsUploading(true);
    await uploadImages(category, ["image"], initialCategory);
    let categoryId = initialCategory.id;
    let error;
    const tmp = {
      name: category.name,
      price: category.price,
      image: category.image,
    };
    if (isEdited)
      error = (
        await supabase
          .from("service-categories")
          .update(tmp)
          .eq("id", initialCategory.id)
      ).error;
    else {
      const { data, error: error1 } = await supabase
        .from("service-categories")
        .insert(tmp)
        .select()
        .single();
      error = error1;
      categoryId = data.id;
    }
    if (error) console.error(error);
    else router.push("/settings/category");

    await supabase
      .from("categories-tags")
      .upsert(
        category.tags.map((tag) => ({ tag_id: tag, category_id: categoryId }))
      );
    setIsUploading(false);
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
        className="flex flex-col gap-6"
      >
        <FormUploadImage
          name={"image"}
          rules={[{ required: true }]}
          label="Hình ảnh danh mục"
        />
        <div>
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true }]}
          >
            <Input placeholder=" Nhập tên danh mục" />
          </Form.Item>

          <HelperText>
            Danh mục mới tạo không được trùng với tên danh mục đang có sẵn.
          </HelperText>
        </div>

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
        <Form.Item name="price" label="Giá chỉ từ" rules={[{ required: true }]}>
          <Input placeholder="Chỉ nhập số" type="number" />
        </Form.Item>
        <footer className="grid grid-cols-2 gap-6 mt-6">
          <Button onClick={() => router.back()} disabled={isUploading}>
            Hoàn tác
          </Button>
          <Button type="primary" htmlType="submit" disabled={isUploading}>
            {isEdited ? "Chỉnh sửa" : "Thêm mới"}
          </Button>
        </footer>
      </Form>
    </Modal>
  );
}

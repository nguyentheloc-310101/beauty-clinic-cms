"use client";
import { IServiceStep } from "@/common/types";
import { Button, Form, Tooltip, Upload, UploadFile, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import querystring from "query-string";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/services";
import { getIdFromSupabaseStorage } from "@/common/utils";

interface IFormStep extends IServiceStep {
  imageFile: any[];
}
export default function Create() {
  const { data, isEdited = false } = querystring.parse(
    useSearchParams().toString()
  );

  let initialStep = {} as IFormStep;
  try {
    initialStep = JSON.parse(data as string) as IFormStep;
    initialStep.imageFile = [
      {
        uid: "-1",
        status: "done",
        url: initialStep.image,
      } as UploadFile,
    ];
  } catch (error) {
    console.log(error);
  }

  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (item: IFormStep) => {
    messageApi.open({
      type: "loading",
      content: "Đang " + (isEdited ? "lưu thay đổi..." : "thêm mới..."),
    });
    if (isEdited) update(initialStep.id, item);
    else create(item);
    message.success("Thành công!");
    messageApi.destroy();
    router.push("/service-steps");
  };
  return (
    <>
      {contextHolder}
      <header className="flex p-2 gap-4">
        <Tooltip title="Trở về">
          <Button
            shape="circle"
            type="text"
            icon={<LeftOutlined />}
            onClick={router.back}
          />
        </Tooltip>
        <h2>
          {isEdited
            ? "Chỉnh sửa thông tin bác sĩ"
            : "Thêm mới thông tin bác sĩ"}
        </h2>
      </header>
      <Form
        labelCol={{ span: 6 }}
        //wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={initialStep}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Ảnh minh họa"
          valuePropName="fileList"
          name="imageFile"
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            accept="image/*"
            fileList={[{ url: initialStep.image }] as any}
          >
            Tải lên
          </Upload>
        </Form.Item>
        <Form.Item label="Mô tả" name="desc">
          <TextArea rows={4} />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="block ml-auto">
          {isEdited ? "Lưu thay đổi" : "Tạo mới"}
        </Button>
      </Form>
    </>
  );
}

async function create(step: IFormStep) {
  const imageKey = "service-steps/" + uuidv4() + ".png";
  await supabase.storage
    .from("aura")
    .upload(imageKey, step.imageFile[0].originFileObj);

  await supabase.from("service-steps").insert({
    image: supabase.storage.from("aura").getPublicUrl(imageKey).data.publicUrl,
    desc: step.desc,
  });
}

async function update(id: string, step: IFormStep) {
  let image = step.image;
  if (step.imageFile?.[0].originFileObj) {
    await supabase.storage
      .from("aura")
      .remove([getIdFromSupabaseStorage(step.image)]);

    const imageKey = "service-steps/" + uuidv4() + ".png";
    await supabase.storage
      .from("aura")
      .upload(imageKey, step.imageFile[0].originFileObj);
    image = supabase.storage.from("aura").getPublicUrl(imageKey).data.publicUrl;
  }

  await supabase
    .from("service-steps")
    .update({
      image,
      desc: step.desc,
    })
    .eq("id", id);
}

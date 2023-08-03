"use client";
import { Form, Upload } from "antd";
import React from "react";
import Section from "@components/section";
import HelperText from "@components/helper-text";

export default function Home() {
  return (
    <Form layout="vertical" className="flex flex-col gap-9">
      <Section title="Ảnh bìa">
        <Form.Item
          valuePropName="fileList"
          name="imageFile"
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            accept="image/*"
            // fileList={[{ url: initialDoctor.image }] as any}
          >
            Tải ảnh lên
          </Upload>
          <HelperText>Chỉ có thể chọn 1 ảnh bìa duy nhất</HelperText>
        </Form.Item>
      </Section>
      <Section title="Dịch vụ">
        <Form.Item
          valuePropName="fileList"
          name="imageFile"
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            accept="image/*"
            // fileList={[{ url: initialDoctor.image }] as any}
          >
            Tải ảnh lên
          </Upload>
          <HelperText>Chỉ có thể chọn 1 ảnh bìa duy nhất</HelperText>
        </Form.Item>
      </Section>
    </Form>
  );
}

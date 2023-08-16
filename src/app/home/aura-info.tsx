import { Form, Input } from "antd";
import React from "react";
import ActionText from "@components/action-text";
import FormUploadImage, {
  UploadImageButton,
} from "@components/form-upload-image";

type Props = {
  name: string;
};

export default function AuraInfo({ name }: Props) {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }, i: number) => (
            <div key={key} className="mb-3">
              <section className="flex justify-between mb-[6px]">
                <p className="text-body2"> Thông tin {i + 1}</p>
                <ActionText onClick={() => remove(name)}>
                  Xóa thông tin này
                </ActionText>
              </section>
              <div className="flex">
                <FormUploadImage
                  name={[name, "image"]}
                  {...restField}
                  rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
                />
                <div className="flex-1 flex-col flex justify-between pb-2">
                  <Form.Item name={[name, "mainText"]} {...restField}>
                    <Input placeholder="Nhập text chính" className="mb-2" />
                  </Form.Item>
                  <Form.Item name={[name, "subText"]} {...restField}>
                    <Input placeholder="Nhập text phụ" />
                  </Form.Item>
                </div>
              </div>
            </div>
          ))}
          <p className="text-body2"> Thông tin {fields.length + 1}</p>
          <UploadImageButton onClick={() => add()} />
        </>
      )}
    </Form.List>
  );
}

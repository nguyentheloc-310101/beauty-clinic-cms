import React from "react";
import FormUploadImage, {
  UploadImageButton,
} from "../components/form-upload-image";
import { Form, Input } from "antd";
import ActionText from "../components/action-text";

type Props = {
  className?: string;
  name: string;
};

export default function Services({ name }: Props) {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }, i: number) => (
            <div key={key} className="mb-3">
              <section className="flex justify-between mb-[6px]">
                <p className="text-body2">Dịch vụ {i + 1}</p>
                <ActionText onClick={() => remove(name)}>
                  Xóa dịch vụ này
                </ActionText>
              </section>
              <div className="flex">
                <FormUploadImage
                  name={[name, "image"]}
                  {...restField}
                  rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
                />
                <div className="flex-1 flex-col flex justify-between pb-2">
                  <Form.Item name={[name, "name"]} {...restField}>
                    <Input
                      placeholder="Nhập tên dịch vụ"
                      showCount
                      maxLength={9}
                    />
                  </Form.Item>
                  <Form.Item name={[name, "tagline"]} noStyle>
                    <Input
                      placeholder="Nhập tagline đi kèm"
                      showCount
                      maxLength={16}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          ))}
          <p className="text-body2">Dịch vụ {fields.length + 1}</p>
          <UploadImageButton onClick={() => add()} />
        </>
      )}
    </Form.List>
  );
}

import { Button, Form, Input } from "antd";
import React from "react";
import ActionText from "@components/action-text";
import FormUploadImage, {
  UploadImageButton,
} from "@components/form-upload-image";
import TextArea from "antd/es/input/TextArea";

type Props = {
  name: string;
};

export default function CustomFeedbacks({ name }: Props) {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }, i: number) => (
            <div key={key} className="mb-3">
              <section className="flex justify-between mb-[6px]">
                <p className="text-body2"> Khách hàng {i + 1}</p>
                <ActionText onClick={() => remove(name)}>
                  Xóa khách hàng này
                </ActionText>
              </section>
              <div className="grid-cols-2 grid gap-3">
                <div className="flex flex-col gap-3">
                  <FormUploadImage name={[name, "image"]} {...restField} />
                  <Form.Item
                    label="Tên nhân vật"
                    {...restField}
                    name={[name, "name"]}
                  >
                    <Input placeholder="Nhập tên dịch vụ" />
                  </Form.Item>
                  <Form.Item
                    label="Cơ sở phụ trách"
                    {...restField}
                    name={[name, "clinic"]}
                  >
                    <Input placeholder=" Chọn cơ sở phụ trách" />
                  </Form.Item>
                </div>
                <div className="flex flex-col gap-3">
                  <Form.Item
                    label="Chữ ký nhân vật"
                    {...restField}
                    name={[name, "signature"]}
                  >
                    <Input placeholder="Nhập tagline đi kèm" />
                  </Form.Item>
                  <Form.Item
                    label="Nội dung truyền tải"
                    {...restField}
                    name={[name, "content"]}
                  >
                    <TextArea placeholder="Typing" rows={7} />
                  </Form.Item>
                </div>
              </div>
            </div>
          ))}
          <p className="text-body2"> Khách hàng {fields.length + 1}</p>
          <UploadImageButton onClick={() => add()} />
        </>
      )}
    </Form.List>
  );
}

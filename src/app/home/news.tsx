import { Form, Input } from "antd";
import React from "react";
import ActionText from "@components/action-text";
import FormUploadImage, {
  UploadImageButton,
} from "@components/form-upload-image";
import { LinkOutlined } from "@ant-design/icons";

type Props = {
  name: string;
};

export default function News({ name }: Props) {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }, i: number) => (
            <div key={key} className="mb-3">
              <section className="flex justify-between mb-[6px]">
                <p className="text-body2"> Link bài báo {i + 1}</p>
                <ActionText onClick={() => remove(name)}>
                  Xóa thông tin này
                </ActionText>
              </section>
              <div className="flex">
                <FormUploadImage name={[name, "image"]} {...restField} />
                <div className="flex-1">
                  <Form.Item name={[name, "url"]} {...restField}>
                    <Input
                      placeholder="Nhập đường dẫn"
                      suffix={<LinkOutlined />}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          ))}
          <p className="text-body2"> Link bài báo {fields.length + 1}</p>
          <UploadImageButton onClick={() => add()} />
        </>
      )}
    </Form.List>
  );
}

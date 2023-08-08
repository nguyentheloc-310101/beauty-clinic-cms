import { Form, Input } from "antd";
import React from "react";
import ActionText from "@components/action-text";
import FormUploadImage, {
  UploadImageButton,
} from "@components/form-upload-image";
import { LinkOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

type Props = {
  name: string;
};

export default function Steps({ name }: Props) {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }, i: number) => (
            <div key={key} className="mb-3">
              <section className="flex justify-between mb-[6px]">
                <p className="text-body2"> Bước {i + 1}</p>
                <ActionText onClick={() => remove(name)}>
                  Xóa bước này
                </ActionText>
              </section>
              <div className="flex">
                <FormUploadImage name={[name, "image"]} {...restField} />
                <Form.Item
                  label="Chi tiết bước điều trị"
                  name={[name, "url"]}
                  className="flex-1"
                  {...restField}
                >
                  <TextArea
                    placeholder="Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                    rows={3}
                  />
                </Form.Item>
              </div>
            </div>
          ))}
          <p className="text-body2"> Bước {fields.length + 1}</p>
          <UploadImageButton onClick={() => add()} />
        </>
      )}
    </Form.List>
  );
}

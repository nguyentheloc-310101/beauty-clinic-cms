"use client";
import { Form, Input } from "antd";
import React, { useState } from "react";
import { LinkOutlined } from "@ant-design/icons";
import Section from "@components/section";
import HelperText from "@components/helper-text";
import FormUploadImage from "@components/form-upload-image";
import { IHome } from "@types";
import { useUpsert } from "@/common/hooks";
import Services from "./services";
import TextArea from "antd/es/input/TextArea";
import AuraInfo from "./aura-info";
import News from "./news";
import CustomFeedbacks from "./custom-feedbacks";
import Loading from "@components/loading";
import HistoryAside from "@components/layout/history-aside";
import FooterCustom from "../components/layout/footer/Footer";

export default function Home() {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const {
    value: home,
    upsert,
    loading,
  } = useUpsert<IHome>("home", [
    "background",
    "celebFeedback.image",
    ["services", "image"],
    ["news", "image"],
    ["customFeedbacks", "image"],
  ]);
  async function onSubmit(value: IHome) {
    setIsUploading(true);
    await upsert(value);
    setIsUploading(false);
  }
  if (loading) return <Loading />;
  return (
    <Form
      layout="vertical"
      className="h-full flex flex-col"
      initialValues={home!}
      onFinish={onSubmit}
    >
      <div className="flex-1 flex overflow-hidden ">
        <div className="flex flex-col gap-9 p-6 flex-1 overflow-auto">
          <Section title="Ảnh bìa">
            <FormUploadImage name="background" />
          </Section>
          <Section title="Dịch vụ">
            <Services name="services" />
          </Section>

          <div className="grid grid-cols-2 gap-3">
            <Section title="Link video">
              <Form.Item name="videoLink">
                <Input
                  placeholder="Dẫn đường link video ở đây"
                  suffix={<LinkOutlined />}
                />
              </Form.Item>
              <HelperText>
                Mục này sẽ hiển thị tại <br />
                “Bạn có hẹn cùng Aura”
              </HelperText>
            </Section>
            {/* TODO process clinic */}
            {/* <Section title="Aura clinic"> */}
            {/*   <Form.Item name="clinic"> */}
            {/*     <Input placeholder="Chọn cơ sở muốn hiển thị" /> */}
            {/*   </Form.Item> */}
            {/*   <HelperText> */}
            {/*     Mục này sẽ hiển thị tại <br /> */}
            {/*     “Aura - Phá bỏ giới hạn” */}
            {/*   </HelperText> */}
            {/* </Section> */}
          </div>
          <Section
            title="Feedbacks của celeb"
            className="grid grid-cols-2 gap-3"
          >
            <div className="flex flex-col gap-3">
              <FormUploadImage name={["celebFeedback", "image"]} />
              <Form.Item label="Tên nhân vật" name={["celebFeedback", "name"]}>
                <Input placeholder="Nhập tên dịch vụ" />
              </Form.Item>
              <Form.Item
                label="Công việc của nhân vật"
                name={["celebFeedback", "job"]}
              >
                <Input placeholder="Nhập công việc của nhân vật" />
              </Form.Item>
            </div>
            <div className="flex flex-col gap-3">
              <Form.Item
                label="Kết quả làm dịch vụ tại Aura"
                name={["celebFeedback", "tagline"]}
              >
                <Input placeholder="Nhập tagline đi kèm" />
              </Form.Item>
              <Form.Item
                label="Nội dung truyền tải"
                name={["celebFeedback", "content"]}
              >
                <TextArea placeholder="Typing" rows={7} />
              </Form.Item>
            </div>
          </Section>
          <Section title="Feedbacks khách hàng">
            <CustomFeedbacks name="customFeedbacks" />
          </Section>
          <Section title="Báo chí nói gì về Aura">
            <News name="news" />
          </Section>
          <Section title="Thông tin về Aura" optional name="hasAuraInfos">
            <AuraInfo name="auraInfos" />
          </Section>
          {/* TODO add reals to home page */}
          {/* <Section title="Reels"> */}
          {/*   <Input placeholder="Chọn video muốn hiển thị" /> */}
          {/*   <HelperText>Mục này sẽ hiển thị tại "Reels nổi bật"</HelperText> */}
          {/* </Section> */}
        </div>
        <HistoryAside />
      </div>
      <FooterCustom
        leftAction={false}
        onOk={undefined}
        onCancel={undefined}
        textBtnRight={"Lưu"}
        isUploading={isUploading}
      />
    </Form>
  );
}

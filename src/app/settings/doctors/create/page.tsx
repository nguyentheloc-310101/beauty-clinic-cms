"use client";
import FormUploadImage from "@/app/components/form-upload-image";
import HelperText from "@/app/components/helper-text";
import FooterCustom from "@/app/components/layout/footer/Footer";
import HistoryAside from "@/app/components/layout/history-aside";
import PopUpConfirm from "@/app/components/popup-confirm/PopupConfirm";
import Section from "@/app/components/section";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import lottieMagic from "../../../../../public/lottie/add_new.json";
import { useRouter, useSearchParams } from "next/navigation";
import querystring from "query-string";
import { IDoctor } from "@/common/types";
import { imageProcessing } from "@/common/utils";
import { supabase } from "@/services";

const DoctorSetting = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { data, isEdited = false } = querystring.parse(
    useSearchParams().toString()
  );

  let initialDoctor = {} as IDoctor;
  try {
    if (data) initialDoctor = JSON.parse(data as string) as IDoctor;
  } catch (error) {
    console.error(error);
  }
  const router = useRouter();
  const onSubmit = async (doctor: IDoctor) => {
    setIsUploading(true);
    try {
      await imageProcessing(doctor, ["image"]);
      if (isEdited) {
        await supabase
          .from("doctors")
          .update(doctor)
          .eq("id", initialDoctor.id);
      } else {
        await supabase.from("doctors").insert(doctor);
      }

      router.push("/settings/doctors");
    } catch (error) {
      console.error(error);
    }
    setIsUploading(false);
  };
  return (
    <>
      <Form
        layout="vertical"
        className="h-full flex flex-col overflow-auto"
        initialValues={initialDoctor}
        onFinish={onSubmit}
      >
        <div className="flex-1 flex justify-between">
          <div className="m-[24px] w-full">
            <Section title="Ảnh bác sĩ">
              <FormUploadImage name="image" />
              <HelperText>Chỉ có thể chọn 1 ảnh bác sĩ duy nhất</HelperText>
            </Section>
            <div className="mt-[36px]">
              <Section title="Nội dung hiển thị">
                <div className="grid grid-cols-2 gap-[12px] h-full">
                  <div className="flex flex-col gap-[12px]">
                    <Form.Item label="Tên bác sĩ" name="name">
                      <Input placeholder="Nhập tên bác sĩ" />
                    </Form.Item>
                    <Form.Item label="Số năm kinh nghiệm" name="experience">
                      <Input placeholder="Nhập Số năm kinh nghiệm" />
                    </Form.Item>
                    <Form.Item label="Chuyên ngành" name="major">
                      <Input placeholder="Nhập Chuyên ngành" />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      label="Nội dung giới thiệu bác sĩ"
                      name="description"
                    >
                      <TextArea placeholder="Typing" rows={8} />
                    </Form.Item>
                  </div>
                </div>
              </Section>
            </div>
          </div>
          <HistoryAside />
        </div>
        <FooterCustom
          leftAction={false}
          rightAction={true}
          textBtnRight={isEdited ? "Lưu điều chỉnh" : "Thêm mới"}
          isUploading={isUploading}
        />
      </Form>
    </>
  );
};

export default DoctorSetting;

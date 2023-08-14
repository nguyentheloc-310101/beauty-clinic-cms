"use client";
import FormUploadImage from "@components/form-upload-image";
import HelperText from "@components/helper-text";
import FooterCustom from "@components/layout/footer/Footer";
import HistoryAside from "@components/history-aside";
import Section from "@components/section";
import { Form, Input } from "antd";
import { useState } from "react";
import querystring from "query-string";
import { IClinic } from "@/common/types";
import { useSearchParams } from "next/navigation";
import { imageProcessing } from "@/common/utils";
import { supabase } from "@/services";
import { useRouter } from "next/navigation";

const ClinicCreate = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { data, isEdited = false } = querystring.parse(
    useSearchParams().toString()
  );

  let initialClinic = {} as IClinic;
  try {
    if (data) initialClinic = JSON.parse(data as string) as IClinic;
  } catch (error) {
    console.error(error);
  }
  const onSubmit = async (clinic: IClinic) => {
    setIsUploading(true);
    try {
      await imageProcessing(clinic, ["background"]);
      if (isEdited) {
        await supabase
          .from("clinics")
          .update(clinic)
          .eq("id", initialClinic.id);
      } else {
        await supabase.from("clinics").insert(clinic);
      }

      router.push("/settings/clinics");
    } catch (error) {
      console.error(error);
    }
    setIsUploading(false);
  };
  return (
    <Form
      layout="vertical"
      className="h-full flex flex-col overflow-auto"
      initialValues={initialClinic}
      onFinish={onSubmit}
    >
      <div className="flex-1 flex justify-between">
        <div className="m-[24px] w-full">
          <Section title="Ảnh bìa">
            <FormUploadImage name="background" />
            <HelperText>Chỉ có thể chọn 1 ảnh cơ sở duy nhất</HelperText>
          </Section>
          <div className="mt-[36px]">
            <Section title="Nội dung hiển thị">
              <div className="grid grid-cols-2 gap-[12px] h-full">
                <div className="flex flex-col gap-[12px]">
                  <Form.Item label="Tên cơ sở" name="name">
                    <Input placeholder="Nhập tên cơ sở" />
                  </Form.Item>
                  <Form.Item label="Địa chỉ" name="address">
                    <Input placeholder="Nhập Địa chỉ" />
                  </Form.Item>
                  <Form.Item label="Địa chỉ rút gọn" name="short_address">
                    <Input placeholder="Nhập địa chỉ rút gọn" />
                  </Form.Item>
                  <div className="flex items-center justify-between gap-3">
                    <Form.Item label="Giờ mở cửa" name="open">
                      <Input placeholder="Giờ mở cửa" />
                    </Form.Item>
                    <Form.Item label="Giờ đóng cửa" name="closed">
                      <Input placeholder="Giờ đóng cửa" />
                    </Form.Item>
                  </div>
                </div>

                <div>
                  <Form.Item
                    label="Nội dung giới thiệu cơ sở"
                    name="description"
                  >
                    <Input.TextArea rows={10} />
                  </Form.Item>
                </div>
              </div>
            </Section>
          </div>
        </div>
        <HistoryAside history={[]} />
      </div>
      <FooterCustom
        popUpTitle="Thêm mới"
        leftAction={false}
        rightAction={true}
        textBtnRight={isEdited ? "Lưu điều chỉnh" : "Thêm mới"}
        isUploading={isUploading}
      />
    </Form>
  );
};

export default ClinicCreate;

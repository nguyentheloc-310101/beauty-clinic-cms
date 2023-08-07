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
import lottieMagic from "../../../../../public/lottie/star_magic.json";
import { IDoctor } from "@/common/types";

interface DoctorSettingsProps {
  doctor: IDoctor;
}

const DoctorSetting = (props: DoctorSettingsProps) => {
  const { doctor } = props;
  const [confirmEdit, setConfirmEdit] = useState<boolean>(false);
  return (
    <>
      <Form
        layout="vertical"
        className="h-full flex flex-col overflow-auto"
        initialValues={{
          doctor_name: doctor?.name,
          experience: doctor?.experience_year,
          major: doctor?.major,
          introduction_doctor: doctor?.desc_doctor,
        }}
      >
        <div className="flex-1 flex justify-between">
          <div className="m-[24px] w-full">
            <Section title="Ảnh bác sĩ - setting">
              <FormUploadImage name="background" />
              <HelperText>Chỉ có thể chọn 1 ảnh bác sĩ duy nhất</HelperText>
            </Section>
            <div className="mt-[36px]">
              <Section title="Nội dung hiển thị">
                <div className="grid grid-cols-2 gap-[12px] h-full">
                  <div className="flex flex-col gap-[12px]">
                    <Form.Item label="Tên bác sĩ" name="doctor_name">
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
                      name="introduction_doctor"
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
          onOk={() => setConfirmEdit(true)}
          onCancel={undefined}
          textBtnRight={"Lưu"}
        />
      </Form>
      {confirmEdit && (
        <PopUpConfirm
          loading={false}
          title={"Điều chỉnh"}
          description={
            "Khi bấm “Xác nhận” thì thông tin mới sẽ được cập nhật và không thể khôi phục thông tin cũ."
          }
          color={"#BC2449"}
          lottie={lottieMagic}
          onCancel={() => setConfirmEdit(false)}
          onOk={undefined}
        />
      )}
    </>
  );
};

export default DoctorSetting;

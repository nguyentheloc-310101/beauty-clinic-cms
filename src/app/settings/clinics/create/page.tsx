"use client";
import FormUploadImage from "@/app/components/form-upload-image";
import HelperText from "@/app/components/helper-text";
import FooterCustom from "@/app/components/layout/footer/Footer";
import HistoryAside from "@/app/components/layout/history-aside";
import PopUpConfirm from "@/app/components/popup-confirm/PopupConfirm";
import Section from "@/app/components/section";
import { Form, Input } from "antd";
import { useState } from "react";

import lottieMagic from "../../../../../public/lottie/add_new.json";
import { IClinic } from "@/common/types";

// interface SettingClinicProps {
//   clinic: IClinic;
// }

const ClinicCreate = (props: any) => {
  const { clinic } = props;
  const [confirmEditClinic, setConfirmEditClinic] = useState<boolean>(false);
  return (
    <>
      <Form
        layout="vertical"
        className="h-full flex flex-col overflow-auto"
        initialValues={{
          clinic_name: clinic?.name,
          address: clinic?.location,
          short_address: clinic?.short_address,
          open: clinic?.open,
          close: clinic?.closed,
          introduction_clinic: clinic?.description,
        }}
      >
        <div className="flex-1 flex justify-between">
          <div className="m-[24px] w-full">
            <Section title="Ảnh cơ sở- new">
              <FormUploadImage name="background" />
              <HelperText>Chỉ có thể chọn 1 ảnh cơ sở duy nhất</HelperText>
            </Section>
            <div className="mt-[36px]">
              <Section title="Nội dung hiển thị">
                <div className="grid grid-cols-2 gap-[12px] h-full">
                  <div className="flex flex-col gap-[12px]">
                    <Form.Item label="Tên cơ sở" name="clinic_name">
                      <Input placeholder="Nhập tên cơ sở" />
                    </Form.Item>
                    <Form.Item label="Địa chỉ" name="address">
                      <Input placeholder="Nhập Địa chỉ" />
                    </Form.Item>
                    <Form.Item label="Địa chỉ rút gọn" name="short_address">
                      <Input placeholder="Nhập địa chỉ rút gọn" />
                    </Form.Item>
                    <div className="flex items-center justify-between">
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
                      name="introduction_clinic"
                    >
                      <Input.TextArea rows={10} />
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
          onOk={() => setConfirmEditClinic(true)}
          onCancel={undefined}
          textBtnRight={"Thêm mới"}
        />
      </Form>
      {confirmEditClinic && (
        <PopUpConfirm
          loading={false}
          title={"Thêm mới"}
          description={
            "Khi bấm “Xác nhận” thì thông tin mới sẽ được cập nhật và không thể khôi phục thông tin cũ."
          }
          color={"#BC2449"}
          lottie={lottieMagic}
          onCancel={() => setConfirmEditClinic(false)}
          onOk={undefined}
        />
      )}
    </>
  );
};

export default ClinicCreate;

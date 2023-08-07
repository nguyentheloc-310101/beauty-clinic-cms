"use client";
import { IDoctor, IService } from "@/common/types";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Tooltip,
  Upload,
  UploadFile,
  message,
} from "antd";
const { Option } = Select;

import TextArea from "antd/es/input/TextArea";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import querystring from "query-string";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/services";
import { getIdFromSupabaseStorage } from "@/common/utils";
import { useFetch } from "@/common/hooks";
import PopUpConfirm from "@/app/components/popup-confirm/PopupConfirm";
import FooterCustom from "@/app/components/layout/footer/Footer";
import HistoryAside from "@/app/components/layout/history-aside";
import Section from "@/app/components/section";
import FormUploadImage from "@/app/components/form-upload-image";
import HelperText from "@/app/components/helper-text";

import lottieStar from "../../../../public/lottie/star_magic.json";

interface IFormDoctor extends IDoctor {
  imageFile: any[];
}
export default function Create() {
  const [confirmEdit, setConfirmEdit] = useState<boolean>(false);

  const { value: services } = useFetch<IService[]>(() =>
    supabase.from("services").select()
  );
  const { data, isEdited = false } = querystring.parse(
    useSearchParams().toString()
  );

  let initialDoctor = {} as IFormDoctor;
  try {
    initialDoctor = JSON.parse(data as string) as IFormDoctor;
    initialDoctor.imageFile = [
      {
        uid: "-1",
        name: initialDoctor.name,
        status: "done",
        url: initialDoctor.image,
      } as UploadFile,
    ];
  } catch (error) {
    console.log(error);
  }

  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (doctor: IFormDoctor) => {
    messageApi.open({
      type: "loading",
      content: "Đang " + (isEdited ? "lưu thay đổi..." : "thêm mới..."),
    });
    try {
      if (isEdited) updateDoctor(initialDoctor.id, doctor);
      else createDoctor(doctor);
      message.success("Thành công!");
    } catch (error) {
      message.error("Xảy ra lỗi!");
    }
    messageApi.destroy();
    router.push("/doctors");
  };
  return (
    <>
      {/* {contextHolder}
      <header className="flex p-2 gap-4">
        <Tooltip title="Trở về">
          <Button
            shape="circle"
            type="text"
            icon={<LeftOutlined />}
            onClick={router.back}
          />
        </Tooltip>
      </header> */}
      <Form layout="vertical" className="h-full flex flex-col overflow-auto">
        <div className="flex-1 flex justify-between">
          <div className="m-[24px] w-full">
            <Section title="Ảnh bìa">
              <FormUploadImage name="background" />
              <HelperText>Chỉ có thể chọn 1 ảnh bìa duy nhất</HelperText>
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
                    <Form.Item label="Chuyên ngành">
                      <Input placeholder="Nhập Chuyên ngành" />
                    </Form.Item>
                  </div>

                  <div>
                    <Form.Item
                      label="Nội dung giới thiệu dịch vụ"
                      name="introduction"
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
          lottie={lottieStar}
          onCancel={() => setConfirmEdit(false)}
          onOk={undefined}
        />
      )}
    </>
  );
}

async function createDoctor(doctor: IFormDoctor) {
  const imageKey = "doctors/" + uuidv4() + ".png";
  await supabase.storage
    .from("aura")
    .upload(imageKey, doctor.imageFile[0].originFileObj);

  await supabase.from("doctors").insert({
    name: doctor.name,
    experience_year: doctor.experience_year,
    image: supabase.storage.from("aura").getPublicUrl(imageKey).data.publicUrl,
    major: doctor.major,
    desc_doctor: doctor.desc_doctor,
    service_id: doctor.service_id,
  });
}

async function updateDoctor(id: string, doctor: IFormDoctor) {
  let image = doctor.image;
  if (doctor.imageFile?.[0].originFileObj) {
    await supabase.storage
      .from("aura")
      .remove([getIdFromSupabaseStorage(doctor.image)]);

    const imageKey = "doctors/" + uuidv4() + ".png";
    await supabase.storage
      .from("aura")
      .upload(imageKey, doctor.imageFile[0].originFileObj);
    image = supabase.storage.from("aura").getPublicUrl(imageKey).data.publicUrl;
  }

  await supabase
    .from("doctors")
    .update({
      name: doctor.name,
      experience_year: doctor.experience_year,
      image,
      major: doctor.major,
      desc_doctor: doctor.desc_doctor,
      service_id: doctor.service_id,
    })
    .eq("id", id);
}

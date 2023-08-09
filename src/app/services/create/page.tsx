"use client";
import { IDoctor, IService } from "@/common/types";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import querystring from "query-string";
import Section from "@components/section";
import FormUploadImage from "@/app/components/form-upload-image";
import HelperText from "@/app/components/helper-text";
import Steps from "./steps";
import { imageProcessing } from "@/common/utils";
import { supabase } from "@/services";
import FooterCustom from "@/app/components/layout/footer/Footer";
import FormSelectMultiple from "@/app/components/form-select-multiple";
import { useFetch } from "@/common/hooks";

export default function Create() {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { data, isEdited = false } = querystring.parse(
    useSearchParams().toString()
  );

  let initialService = {} as IService;
  try {
    if (data) {
      initialService = JSON.parse(data as string) as IService;
      initialService = {
        ...initialService,
        doctors: initialService.doctors.map((doctor: any) => doctor.id),
        others: initialService.others.map((other) => other.id) as any,
      };
    }
  } catch (error) {
    console.error(error);
  }
  const router = useRouter();
  const onFinish = async (service: IService) => {
    setIsUploading(true);
    try {
      await imageProcessing(service, ["image", ["steps", "image"]]);

      if (isEdited) {
        if (service.doctors) {
          await supabase.from("service-doctors").upsert(
            service.doctors.map((doctor_id) => ({
              service_id: initialService.id,
              doctor_id,
            }))
          );
        }
        if (service.others) {
          await supabase.from("others").upsert(
            service.others.map((other) => ({
              id: initialService.id,
              other,
            }))
          );
        }
        await supabase
          .from("services")
          .update({ ...service, doctors: undefined, others: undefined })
          .eq("id", initialService.id);
      } else {
        const { data } = await supabase
          .from("services")
          .insert({ ...service, doctors: undefined, others: undefined })
          .select();

        if (service.doctors && data) {
          await supabase.from("service-doctors").insert(
            service.doctors.map((doctor_id) => ({
              service_id: data[0].id,
              doctor_id,
            }))
          );
          await supabase.from("others").insert(
            service.doctors.map((other) => ({
              id: data[0].id,
              other,
            }))
          );
        }
      }

      router.push("/services");
    } catch (error) {
      console.error(error);
    }
    setIsUploading(false);
  };

  const { value } = useFetch<IDoctor[]>(() =>
    supabase.from("doctors").select()
  );
  const doctors =
    value?.map((doctor) => ({
      value: doctor.id,
      label: doctor.name,
    })) ?? [];

  const { value: value1 } = useFetch<IService[]>(() =>
    supabase.from("services").select()
  );
  const otherServices =
    value1?.map((service) => ({
      value: service.id,
      label: service.name,
    })) ?? [];
  return (
    <Form
      layout="vertical"
      initialValues={initialService}
      onFinish={onFinish}
      className="flex flex-col justify-between h-full"
    >
      <div className="overflow-auto p-6 flex flex-col gap-9">
        <Section title="Giới thiệu dịch vụ" className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            <FormUploadImage name={"image"} />
            <Form.Item name={"name"} label="Tên dịch vụ">
              <Input placeholder={"Nhập tên dịch vụ"} />
            </Form.Item>
            <HelperText className="mt-[-8px]">
              Tên dịch vụ sẽ là title của bài viết
            </HelperText>
            <Form.Item name={"price"} label="Giá chỉ từ">
              <Input placeholder="Chỉ nhập số" type="number" />
            </Form.Item>
            <HelperText className="mt-[-8px]">Có thể bỏ qua mục này</HelperText>
          </div>
          <Form.Item label="Nội dung giới thiệu dịch vụ" name={"description"}>
            <TextArea placeholder="Typing" rows={13} />
          </Form.Item>
        </Section>
        <Section optional title="Đội ngũ bác sĩ" name="hasDoctors">
          <FormSelectMultiple
            placeholder={"Chọn bác sĩ muốn hiển thị"}
            name={"doctors"}
            options={doctors}
          />
          <HelperText>
            Mục này sẽ hiển thị tại <br />
            “Đội ngũ Y Bác sĩ uy tín”
          </HelperText>
        </Section>
        <Section title="Các bước điều trị" optional name="hasSteps">
          <Steps name="steps" />
        </Section>
        <Section title="Giới thiệu dịch vụ khác" className="w-1/2">
          <FormSelectMultiple
            placeholder={"Chọn dịch vụ muốn link"}
            name={"others"}
            options={otherServices}
          />
          <HelperText>
            Mục này sẽ hiển thị tại “Dịch vụ khác tại Thẩm mỹ Aura”
          </HelperText>
        </Section>
      </div>
      <FooterCustom
        leftAction={false}
        rightAction={true}
        textBtnRight={isEdited ? "Lưu điều chỉnh" : "Đăng bài"}
        isUploading={isUploading}
      />
    </Form>
  );
}

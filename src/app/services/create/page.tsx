"use client";
import { IDoctor, IServiceDetails } from "@/common/types";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import querystring from "query-string";
import Section from "@components/section";
import FormUploadImage from "@/app/components/form-upload-image";
import HelperText from "@/app/components/helper-text";
import Steps from "./steps";
import { Edit, uploadImages } from "@/common/utils";
import { supabase } from "@/services";
import FooterCustom from "@/app/components/layout/footer/Footer";
import FormSelectMultiple from "@/app/components/form-select-multiple";
import { useFetch } from "@/common/hooks";
import FormSelect from "@/app/components/form-select";
import HistoryAside from "@/app/components/history-aside";

export default function Create() {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { data, isEdited = false } = querystring.parse(
    useSearchParams().toString()
  );

  let initialService = {} as IServiceDetails;
  try {
    if (data) {
      initialService = JSON.parse(data as string) as IServiceDetails;
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
  const onFinish = async (service: IServiceDetails) => {
    setIsUploading(true);
    const user = (await supabase.auth.getUser()).data.user?.id;
    try {
      await uploadImages(service, ["image", ["steps", "image"]]);
      if (service.doctors) {
        await supabase.from("service-doctors").upsert(
          service.doctors.map((doctor_id) => ({
            service_id: service.service_id,
            doctor_id,
          }))
        );
      }
      if (service.others) {
        await supabase.from("others").upsert(
          service.others.map((other) => ({
            id: service.service_id,
            other,
          }))
        );
      }
      if (isEdited) {
        await supabase
          .from("service-details")
          .update({ ...service, doctors: undefined, others: undefined })
          .eq("id", initialService.id);

        await addChangeToHistory(
          initialService!,
          service,
          user,
          initialService.id
        );
      } else {
        const { data } = await supabase
          .from("service-details")
          .insert({ ...service, doctors: undefined, others: undefined })
          .select()
          .single();

        const history = {
          user,
          action: {
            // scope: "tất cả",
            name: "create",
            display: "tạo mới",
          },
          page: "services/" + data?.id,
        };
        await supabase.from("history").insert(history);
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

  const { value: value1 } = useFetch<IServiceDetails[]>(() =>
    supabase.from("services").select()
  );
  const otherServices =
    value1?.map((service) => ({
      value: service.id,
      label: service.name,
    })) ?? [];

  const { value: value2 } = useFetch<IServiceDetails[]>(() =>
    supabase.rpc("getserviceselect").select()
  );
  const services =
    value2?.map((service) => ({
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
      <div className="flex-1 flex justify-between basis-auto overflow-hidden">
        <div className="overflow-auto p-6 flex flex-col gap-9 flex-1">
          <Section
            title="Giới thiệu dịch vụ"
            className="grid grid-cols-2 gap-3"
          >
            <div className="flex flex-col gap-3">
              <FormUploadImage name={"image"} />
              <FormSelect
                name={"service_id"}
                options={services}
                label="Tên dịch vụ"
                placeholder="Chọn dịch vụ đã tạo"
              />
              <HelperText className="mt-[-8px]">
                Tên dịch vụ sẽ là title của bài viết
              </HelperText>
              <Form.Item name={"price"} label="Giá chỉ từ">
                <Input placeholder="Chỉ nhập số" type="number" />
              </Form.Item>
              <HelperText className="mt-[-8px]">
                Có thể bỏ qua mục này
              </HelperText>
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
              Mục này sẽ hiển thị tại “Đội ngũ Y Bác sĩ uy tín”
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

        <HistoryAside page={"services/" + initialService.id} />
      </div>
      <FooterCustom
        popUpTitle="Thêm mới"
        leftAction={false}
        rightAction={true}
        textBtnRight={isEdited ? "Lưu điều chỉnh" : "Đăng bài"}
        isUploading={isUploading}
      />
    </Form>
  );
}

async function addChangeToHistory(
  originalValue: IServiceDetails,
  value: IServiceDetails,
  user: string | undefined,
  id: string
) {
  const edit = new Edit(originalValue, value);
  edit.compare("description", {
    scope: "Nội dung giới thiệu dịch vụ",
    name: "edit",
    display: "chỉnh sửa mục",
  });
  edit.compare("image", {
    scope: "Ảnh bìa",
    name: "edit",
    display: "chỉnh sửa mục",
  });
  edit.compare("name", {
    scope: "Tên dịch vụ",
    name: "edit",
    display: "chỉnh sửa mục",
  });
  edit.compare("others", {
    scope: "Giới thiệu dịch vụ khác",
    name: "edit",
    display: "chỉnh sửa mục",
  });
  edit.compare("hasSteps", {
    scope: "Các bước điều trị",
    name: "hide",
    display: "ẩn/hiện mục",
  });

  edit.compare("hasDoctors", {
    scope: "Thông tin về Aura",
    name: "hide",
    display: "ẩn/hiện mục",
  });

  const history = edit.getActions().map((action) => ({
    user,
    action,
    page: "services/" + id,
  }));
  if (history.length != 0) await supabase.from("history").insert(history);
}

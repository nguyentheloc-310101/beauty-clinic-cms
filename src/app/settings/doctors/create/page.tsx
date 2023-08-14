"use client";
import FormUploadImage from "@/app/components/form-upload-image";
import HelperText from "@/app/components/helper-text";
import FooterCustom from "@/app/components/layout/footer/Footer";
import HistoryAside from "@components/history-aside";
import Section from "@/app/components/section";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import querystring from "query-string";
import { IDoctor, IHistory } from "@/common/types";
import { imageProcessing } from "@/common/utils";
import { supabase } from "@/services";
import { useFetch } from "@/common/hooks";

const DoctorSetting = () => {
  const { value: history, loading: historyLoading } = useFetch<IHistory[]>(() =>
    supabase
      .from("history")
      .select("*, user(*)")
      .eq("page", "doctors")
      .order("created_at", { ascending: false })
      .limit(20)
  );
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

    const user = (await supabase.auth.getUser()).data.user?.id;
    try {
      await imageProcessing(doctor, ["image"]);
      if (isEdited) {
        await supabase
          .from("doctors")
          .update(doctor)
          .eq("id", initialDoctor.id);

        const history = {
          user,
          action: {
            // scope: "tất cả",
            name: "edit",
            display: "chỉnh sửa",
          },
          page: "doctors",
        };
        await supabase.from("history").insert(history);
      } else {
        await supabase.from("doctors").insert(doctor);
        const history = {
          user,
          action: {
            // scope: "tất cả",
            name: "create",
            display: "tạo mới",
          },
          page: "doctors",
        };
        await supabase.from("history").insert(history);
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
          {!historyLoading && <HistoryAside history={history!} />}
        </div>
        <FooterCustom
          leftAction={false}
          popUpTitle="Thêm mới"
          rightAction={true}
          textBtnRight={isEdited ? "Lưu điều chỉnh" : "Thêm mới"}
          isUploading={isUploading}
        />
      </Form>
    </>
  );
};

export default DoctorSetting;

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
import { Edit, uploadImages } from "@/common/utils";
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
    const user = (await supabase.auth.getUser()).data.user?.id;
    try {
      await uploadImages(clinic, ["background"]);
      if (isEdited) {
        await supabase
          .from("clinics")
          .update(clinic)
          .eq("id", initialClinic.id);

        await addChangeToHistory(
          initialClinic!,
          clinic,
          user,
          initialClinic.id
        );
      } else {
        const { data } = await supabase
          .from("clinics")
          .insert(clinic)
          .select()
          .single();
        const history = {
          user,
          action: {
            name: "create",
            display: "tạo mới",
          },
          page: "clinics" + data?.id,
        };
        await supabase.from("history").insert(history);
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
      className="h-full flex flex-col "
      initialValues={initialClinic}
      onFinish={onSubmit}
    >
      <div className="flex-1 flex justify-between basis-auto overflow-hidden">
        <div className="p-[24px] w-full h-full overflow-auto">
          <Section title="Ảnh bìa">
            <FormUploadImage
              name="background"
              rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
            />
            <HelperText>Chỉ có thể chọn 1 ảnh cơ sở duy nhất</HelperText>
          </Section>
          <div className="mt-[36px]">
            <Section title="Nội dung hiển thị">
              <div className="grid grid-cols-2 gap-[12px] h-full">
                <div className="flex flex-col gap-[12px]">
                  <Form.Item
                    label="Tên cơ sở"
                    name="name"
                    required
                  >
                    <Input placeholder="Nhập tên cơ sở" />
                  </Form.Item>
                  <Form.Item
                    label="Địa chỉ"
                    name="address"
                    required
                  >
                    <Input placeholder="Nhập Địa chỉ" />
                  </Form.Item>
                  <Form.Item
                    label="Địa chỉ rút gọn"
                    name="short_address"
                    required
                  >
                    <Input placeholder="Nhập địa chỉ rút gọn" />
                  </Form.Item>
                  <div className="flex items-center justify-between gap-3">
                    <Form.Item
                      label="Giờ mở cửa"
                      name="open"
                      required
                    >
                      <Input placeholder="Giờ mở cửa" />
                    </Form.Item>
                    <Form.Item
                      label="Giờ đóng cửa"
                      name="closed"
                      required
                    >
                      <Input placeholder="Giờ đóng cửa" />
                    </Form.Item>
                  </div>
                </div>

                <div>
                  <Form.Item
                    label="Nội dung giới thiệu cơ sở"
                    name="description"
                    required
                  >
                    <Input.TextArea rows={10} />
                  </Form.Item>
                </div>
              </div>
            </Section>
          </div>
        </div>
        <HistoryAside page={"clinics/" + initialClinic.id} />
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

async function addChangeToHistory(
  originalValue: IClinic,
  value: IClinic,
  user: string | undefined,
  id: string
) {
  const edit = new Edit(originalValue, value);
  edit.compare("description", {
    scope: "Nội dung giới thiệu dịch vụ",
    name: "edit",
    display: "chỉnh sửa mục",
  });
  edit.compare("background", {
    scope: "Ảnh bìa",
    name: "edit",
    display: "chỉnh sửa mục",
  });
  edit.compare("name", {
    scope: "Tên dịch vụ",
    name: "edit",
    display: "chỉnh sửa mục",
  });
  edit.compare("address", {
    scope: "Địa chỉ",
    name: "edit",
    display: "chỉnh sửa mục",
  });

  edit.compare("short_address", {
    scope: "Địa chỉ rút gọn",
    name: "edit",
    display: "chỉnh sửa mục",
  });
  edit.compare("open", {
    scope: "Giờ mở cửa",
    name: "edit",
    display: "chỉnh sửa mục",
  });

  edit.compare("closed", {
    scope: "Giờ đóng cửa",
    name: "edit",
    display: "chỉnh sửa mục",
  });

  const history = edit.getActions().map((action) => ({
    user,
    action,
    page: "services/" + id,
  }));
  if (history.length != 0) await supabase.from("history").insert(history);
}
export default ClinicCreate;

"use client";

import { SERVICES } from "@/common/dump-data";
import { IService } from "@/common/types";
import { DatePicker } from "antd";
import { useState } from "react";
import lottieMagic from "../../../public/lottie/star_magic.json";
import Card, { NewCardButton } from "../components/card";
import FooterCustom from "../components/layout/footer/Footer";
import PopUpConfirm from "../components/popup-confirm/PopupConfirm";
type Props = {};

interface IDisplayService extends IService {
  isSelected?: boolean;
}
export default function Service({}: Props) {
  const [data, setData] = useState<IDisplayService[]>(SERVICES);
  const [confirmEdit, setConfirmEdit] = useState<boolean>(false);

  console.log(data);
  return (
    <div className="h-full flex flex-col justify-between ">
      <div className="flex items-center justify-end pt-[24px] px-[24px] w-full">
        <DatePicker placeholder="Chọn thời gian" className="w-[338px]" />
      </div>
      <section className="flex flex-wrap gap-6 p-6">
        <NewCardButton title="THÊM BÀI VIẾT MỚI" createUrl="/services/create" />
        {data.map((item, i: number) => (
          <Card
            key={i}
            image={
              "https://ucarecdn.com/f333f6dd-9c74-41f9-859e-ad7f3234b114/-/quality/smart/-/format/auto/"
            }
            title={item.name}
            description={item.content}
            editUrl={"services/create"}
            isSelected={item.isSelected ?? false}
            onSelectCallBack={(isSelected) => {
              const tempData = JSON.parse(JSON.stringify(data));
              tempData[i].isSelected = isSelected;
              setData(tempData);
            }}
          />
        ))}
      </section>
      <FooterCustom
        leftAction={false}
        onOk={() => setConfirmEdit(true)}
        onCancel={undefined}
        textBtnRight={"Điều chỉnh"}
      />
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
    </div>
  );
}

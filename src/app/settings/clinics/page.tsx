"use client";
import { IService } from "@/common/types";
import { useState } from "react";

import Card, { NewCardButton } from "@/app/components/card";
import FooterCustom from "@/app/components/layout/footer/Footer";
import PopUpConfirm from "@/app/components/popup-confirm/PopupConfirm";
import { SERVICES } from "@/common/dump-data";
import lottieMagic from "../../../../public/lottie/star_magic.json";

type Props = {};

interface IDisplayDoctor extends IService {
  isSelected?: boolean;
}
export default function Service({}: Props) {
  const [data, setData] = useState<IDisplayDoctor[]>(SERVICES);
  const [confirmEdit, setConfirmEdit] = useState<boolean>(false);

  console.log(data);
  return (
    <div className="h-full flex flex-col justify-between ">
      <section className="flex flex-wrap gap-6 p-6">
        <NewCardButton
          title="THÊM CƠ SỞ MỚI"
          createUrl="/settings/clinics/create"
        />
        {data.map((item, i: number) => (
          <Card
            key={i}
            image={
              "https://ucarecdn.com/9aa03e00-e71e-405f-b501-cf15bc1c9e9e/-/quality/smart/-/format/auto/"
            }
            title={"Tên Cơ Sở"}
            description={item.content}
            editUrl={"clinics/clinic-settings"}
            isSelected={item.isSelected ?? false}
            onSelectCallBack={(isSelected: boolean) => {
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

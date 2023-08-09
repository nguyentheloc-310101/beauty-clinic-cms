"use client";
import { IService } from "@/common/types";
import { useState } from "react";

import Card, { NewCardButton } from "@/app/components/card";
import FooterCustom from "@/app/components/layout/footer/Footer";
import { useRemove } from "@/common/hooks";
import queryString from "query-string";
import { Input } from "antd";

type Props = {};

interface IDisplayDoctor extends IService {
  isSelected: boolean;
}
export default function Service({ }: Props) {
  const { value, remove, select, selectAll } = useRemove<IDisplayDoctor[]>(
    "clinics",
    []
  );

  const [searchText, setSearchText] = useState<string>("");
  return (
    <div className="h-full flex flex-col justify-between ">
      <div>
        <Input
          className="block ml-auto mt-6 mx-6  max-w-[50%]"
          placeholder="Tìm kiếm tên cơ sở:"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <section className="flex flex-wrap gap-6 p-6">
          <NewCardButton
            title="THÊM CƠ SỞ MỚI"
            createUrl="/settings/clinics/create"
          />
          {value
            ?.filter((item) =>
              item.name?.toLowerCase().includes(searchText?.toLowerCase())
            )
            .map((item, i: number) => (
              <Card
                key={i}
                image={
                  "https://ucarecdn.com/9aa03e00-e71e-405f-b501-cf15bc1c9e9e/-/quality/smart/-/format/auto/"
                }
                title={item.name}
                description={item.description}
                editUrl={
                  "clinics/create?" +
                  queryString.stringify({
                    isEdited: true,
                    data: JSON.stringify(value[i]),
                  })
                }
                isSelected={item.isSelected ?? false}
                onSelectCallBack={() => select(i)}
              />
            ))}
        </section>
      </div>
      <FooterCustom
        data={value}
        onChangeCheckBox={(e) => selectAll(e)}
        onConFirmDelete={() => remove()}
        leftAction={true}
        rightAction={false}
      />
    </div>
  );
}

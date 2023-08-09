"use client";
import { IDoctor } from "@/common/types";

import Card, { NewCardButton } from "@/app/components/card";
import FooterCustom from "@/app/components/layout/footer/Footer";
import { useRemove } from "@/common/hooks";
import queryString from "query-string";
import { Input } from "antd";
import { useState } from "react";

type Props = {};

interface IDisplayDoctor extends IDoctor {
  isSelected: boolean;
}
export default function Service({ }: Props) {
  const { value, remove, select, selectAll } = useRemove<IDisplayDoctor[]>(
    "doctors",
    [""]
  );

  const [searchText, setSearchText] = useState<string>("");
  return (
    <div className="h-full flex flex-col justify-between ">
      <div>
        <Input
          className="block ml-auto mt-6 mx-6 max-w-[50%]"
          placeholder="Tìm kiếm tên bác sĩ:"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <section className="flex flex-wrap gap-6 p-6">
          <NewCardButton
            title="THÊM BÁC SĨ MỚI"
            createUrl="/settings/doctors/create"
          />
          {value
            ?.filter((item) =>
              item.name?.toLowerCase().includes(searchText?.toLowerCase())
            )
            ?.map((item, i: number) => (
              <Card
                key={i}
                image={item.image}
                title={item.name}
                description={"Ngành: " + item.major}
                subtitle={item.experience + " năm kinh nghiệm"}
                editUrl={
                  "doctors/create?" +
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

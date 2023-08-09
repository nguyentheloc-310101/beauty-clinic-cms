"use client";

import { IService } from "@/common/types";
import Card, { NewCardButton } from "../components/card";
import { useRemove } from "@/common/hooks";
import queryString from "query-string";
import FooterCustom from "@components/layout/footer/Footer";
import { Input } from "antd";
import { useState } from "react";

type Props = {};

interface IDisplayService extends IService {
  isSelected: boolean;
}
export default function Service({ }: Props) {
  const { value, remove, select, selectAll } = useRemove<IDisplayService[]>(
    "services",
    [],
    "*, doctors!service-doctors(id), others!others_other_fkey(id)"
  );
  const [searchText, setSearchText] = useState<string>("");
  return (
    <div className="h-full flex flex-col justify-between ">
      <div>
        <Input
          className="block ml-auto mt-6 mx-6  max-w-[50%]"
          placeholder="Tìm kiếm tên dịch vụ:"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <section className="flex flex-wrap gap-6 p-6 flex-1">
          <NewCardButton
            title="THÊM BÀI VIẾT MỚI"
            createUrl="/services/create"
          />
          {value
            ?.filter((item) =>
              item.name?.toLowerCase().includes(searchText?.toLowerCase())
            )
            .map((item, i: number) => (
              <Card
                key={i}
                image={item.image}
                title={item.name}
                description={item.description}
                editUrl={
                  "services/create?" +
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

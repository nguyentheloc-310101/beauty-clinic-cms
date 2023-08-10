"use client";

import { IServiceDetails } from "@/common/types";
import Card, { NewCardButton } from "../components/card";
import { useRemove } from "@/common/hooks";
import queryString from "query-string";
import FooterCustom from "@components/layout/footer/Footer";
import { Input } from "antd";
import { useState } from "react";

type Props = {};

interface IDisplayService extends IServiceDetails {
  isSelected: boolean;
}
export default function Service({ }: Props) {
  // NOTE chỗ này khó hiểu nè, hỏi iêm đi
  const { value, remove, select, selectAll } = useRemove<IDisplayService[]>(
    "service-details",
    [],
    "*, service:services(name, doctors(id), others!others_other_fkey(id))"
  );

  const services = value?.map((item: IDisplayService) => ({
    ...item,
    others: item.service?.others,
    doctors: item.service?.doctors,
  }));

  const [searchText, setSearchText] = useState<string>("");
  return (
    <div className="h-full max-h-full flex flex-col justify-between ">
      <div className="flex-1 basis-auto overflow-auto">
        <Input
          className="block ml-auto mt-6 mx-6  max-w-[50%]"
          placeholder="Tìm kiếm tên dịch vụ:"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <section className="flex flex-wrap gap-6 p-6 flex-1 overflow-auto basis-auto">
          <NewCardButton
            title="THÊM BÀI VIẾT MỚI"
            createUrl="/services/create"
          />
          {services
            ?.filter(
              (item) =>
                item.service?.name
                  ?.toLowerCase()
                  .includes(searchText?.toLowerCase()) ?? true
            )
            .map((item, i: number) => (
              <Card
                key={i}
                image={item.image}
                title={item.service.name}
                description={item.description}
                editUrl={
                  "services/create?" +
                  queryString.stringify({
                    isEdited: true,
                    data: JSON.stringify(services[i]),
                  })
                }
                isSelected={item.isSelected ?? false}
                onSelectCallBack={() => select(i)}
              />
            ))}
        </section>
      </div>
      <FooterCustom
        data={services}
        onChangeCheckBox={(e) => selectAll(e)}
        onConFirmDelete={() => remove()}
        leftAction={true}
        rightAction={false}
      />
    </div>
  );
}

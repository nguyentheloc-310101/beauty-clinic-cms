"use client";

import { IService } from "@/common/types";
import Card, { NewCardButton } from "../components/card";
import { useRemove } from "@/common/hooks";
import queryString from "query-string";
import FooterCustom from "@components/layout/footer/Footer";

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
  return (
    <div className="h-full flex flex-col justify-between ">
      <section className="flex flex-wrap gap-6 p-6">
        <NewCardButton title="THÊM BÀI VIẾT MỚI" createUrl="/services/create" />
        {value?.map((item, i: number) => (
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

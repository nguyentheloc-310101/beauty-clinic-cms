import FormSelect from "@/app/components/form-select";
import { useFetch } from "@/common/hooks";
import { IServiceCategory } from "@/common/types";
import { supabase } from "@/services";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

type Props = {
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<string>>;
};

const HeaderServiceSettings = ({ setSelectedCategoryId }: Props) => {
  const { value } = useFetch<IServiceCategory[]>(() =>
    supabase.from("service-categories").select()
  );
  const categories =
    value?.map((category) => ({
      value: category.id,
      label: category.name,
    })) ?? [];
  categories.unshift({ value: "", label: "-- Không chọn --" });

  return (
    <div className="flex items-center justify-between h-[46px]">
      <div className="text-[20px] text-[#36383A] font-[700] leading-[30px] tracking-[-.15px]">
        Dịch vụ
      </div>
      <div className="flex gap-[10px] items-center">
        <FormSelect
          onChange={(e: any) => setSelectedCategoryId(e)}
          className="min-w-[150px] mt-2"
          placeholder={"Chọn danh mục"}
          name={"category_id"}
          options={categories}
        />
        <Link href={"service/create"}>
          <Button className="bg-[#BC2449] h-full w-[188px] px-[24px] py-[12px]  text-white">
            Thêm dịch vụ
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderServiceSettings;

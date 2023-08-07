import { Button, DatePicker } from "antd";
import Link from "next/link";
import React from "react";

const HeaderCategorySettings = () => {
  return (
    <div className="flex items-center justify-between h-[46px]">
      <div className="text-[20px] text-[#36383A] font-[700] leading-[30px] tracking-[-.15px]">
        Danh mục
      </div>
      <div className="flex gap-[10px]">
        <div>
          <DatePicker className="w-[288px]" />
        </div>
        <Link href="/settings/service-categories/category/create">
          <Button className="bg-[#BC2449] h-full w-[70px] px-[24px] py-[12px]  text-white">
            +
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderCategorySettings;

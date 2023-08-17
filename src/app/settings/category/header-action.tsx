import { Button } from "antd";
import Link from "next/link";
import React from "react";

const HeaderAction = () => {
  return (
    <div className="flex items-center justify-between h-[46px]">
      <div className="text-[20px] text-[#36383A] font-[700] leading-[30px] tracking-[-.15px]">
        Danh mục
      </div>
      <div className="flex gap-[10px]">
        <Link href="category/create">
          <Button className="bg-[#BC2449] h-full px-[24px] py-[12px]  text-white">
            Thêm danh mục
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderAction;

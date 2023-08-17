"use client";
import React, { useState } from "react";
import HeaderServiceSettings from "./header-action";
import TableService from "./table";

type Props = {};

export default function Service({}: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  return (
    <div className="p-6">
      {/*  NOTE lỗi j đó mà thêm m-6 nó chạy như thật */}
      <div className="bg-white rounded-[8px] w-full p-[24px]">
        <HeaderServiceSettings setSelectedCategoryId={setSelectedCategoryId} />
        <TableService selectedCategoryId={selectedCategoryId} />
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import HeaderCategorySettings from "./header-action/HeaderCategorySettings";
import TableCategory from "./table/TableCategory";

const ServiceCategory = () => {
  const [selectedRow, setSelectedRow] = useState<number>(0);
  return (
    <div className="h-full px-[24px]">
      <div className="grid grid-cols-2 gap-[24px] h-fit">
        <div className="bg-white rounded-[8px] flex flex-col justify-center w-full p-[24px]">
          <HeaderCategorySettings />
          <TableCategory />
        </div>

        <div className="bg-white rounded-[8px] w-full p-[24px]"></div>
      </div>
    </div>
  );
};

export default ServiceCategory;

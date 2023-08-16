"use client";
import React, { useState } from "react";
import HeaderServiceSettings from "./service/header-action";
import TableService from "./service/table";
import HeaderAction from "./category/header-action";
import Table from "./category/table";

const ServiceCategory = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  return (
    <div className="h-full">
      <div className="grid grid-cols-2 h-[500px] pt-[12px] gap-[24px] px-[24px] ">
        <div className="bg-white rounded-[8px] h-auto flex flex-col w-full p-[24px]">
          <HeaderAction />
          <Table />
        </div>

        <div className="bg-white rounded-[8px] w-full p-[24px]">
          <HeaderServiceSettings
            setSelectedCategoryId={setSelectedCategoryId}
          />
          <TableService selectedCategoryId={selectedCategoryId} />
        </div>
      </div>
    </div>
  );
};

export default ServiceCategory;

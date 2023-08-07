"use client";
import React, { useState } from "react";
import HeaderCategorySettings from "./category/header-action/HeaderCategorySettings";
import TableCategory from "./category/table/TableCategory";
import HeaderServiceSettings from "./service/header-action/HeaderServiceSettings";
import TableService from "./service/table/TableService";

const ServiceCategory = () => {
  return (
    <div className="h-full">
      <div className="grid grid-cols-2 h-[500px] pt-[12px] gap-[24px] px-[24px] ">
        <div className="bg-white rounded-[8px] h-auto flex flex-col justify-center w-full p-[24px]">
          <HeaderCategorySettings />
          <TableCategory />
        </div>

        <div className="bg-white rounded-[8px] w-full p-[24px]">
          <HeaderServiceSettings />
          <TableService />
        </div>
      </div>
    </div>
  );
};

export default ServiceCategory;

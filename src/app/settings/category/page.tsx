"use client";
import React from "react";
import HeaderAction from "./header-action";
import Table from "./table";

type Props = {};

export default function Category({}: Props) {
  return (
    <div className="p-6">
      <div className="bg-white rounded-[8px] h-auto flex flex-col w-full p-[24px]">
        <HeaderAction />
        <Table />
      </div>
    </div>
  );
}

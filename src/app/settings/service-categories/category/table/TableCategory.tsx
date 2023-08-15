"use client";
import React, { useState } from "react";
import Table, { ColumnsType } from "antd/es/table";
import { useRemove } from "@/common/hooks";
import { IServiceCategory } from "@/common/types";
import { formatDate } from "@/common/utils";
import { Popconfirm } from "antd";

interface CategoryType extends IServiceCategory {
  isSelected: boolean;
  key: number;

  name: string;
  quantity: number;
  created_at: string;
}
const columns: ColumnsType<CategoryType> = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Danh mục",
    dataIndex: "name",
  },
  // {
  //   title: "SL Dịch vụ",
  //   dataIndex: "quantity",
  // },
  {
    title: "Ngày tạo",
    dataIndex: "created_at",
    render: (e) => <>{formatDate(e)}</>,
  },
];

const TableCategory = () => {
  const { value, selectKeys, loading, remove } = useRemove<CategoryType[]>(
    "service-categories",
    []
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRow, setSelectedRow] = useState<number>(0);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    selectKeys(newSelectedRowKeys as number[]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  if (loading) return <></>;
  return (
    <div id="table-antd" className="pt-[24px] h-fit">
      <Table
        rowSelection={rowSelection}
        columns={columns}
        onRow={(record) => ({
          onClick: () => {
            setSelectedRow && setSelectedRow((record?.key as number) ?? 0);
          },
        })}
        dataSource={value!}
        scroll={{ y: `calc(100vh - 396px)` }}
        rowClassName={(record) => {
          if (selectedRow == record?.key) {
            return "selected-row";
          }
          return "";
        }}
        footer={() => (
          <div className="w-full gap-[24px] flex justify-between pr-[50px] ">
            <div>{selectedRowKeys.length} danh mục được chọn</div>

            <Popconfirm
              title="Xóa thông tin"
              description="Lưu ý: tất cả dịch vụ thuộc danh mục này sẽ bị xóa theo!"
              onConfirm={() => {
                remove();
                location.reload();
              }}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <div className="text-[#DC1F18] text-[14px] cursor-pointer leading-[20px] tracking-[1.25px] font-[700]">
                Xoá
              </div>
            </Popconfirm>
          </div>
        )}
      />
    </div>
  );
};

export default TableCategory;

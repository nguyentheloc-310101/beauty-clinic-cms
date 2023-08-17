"use client";
import React, { useState } from "react";
import AntdTable, { ColumnsType } from "antd/es/table";
import { useRemove } from "@/common/hooks";
import { EditOutlined } from "@ant-design/icons";
import { IServiceCategory } from "@/common/types";
import { formatCurrency, formatDate } from "@/common/utils";
import { Button, Popconfirm, Tooltip } from "antd";
import Link from "next/link";
import queryString from "query-string";

interface CategoryType extends IServiceCategory {
  isSelected: boolean;
  key: number;

  name: string;
  quantity: number;
  created_at: string;
}

const Table = () => {
  const { value, selectKeys, loading, remove } = useRemove<CategoryType[]>(
    "service-categories",
    ["image"],
    "*, tags(*)"
  );

  const columns: ColumnsType<CategoryType> = [
    {
      title: "STT",
      dataIndex: "key",
      width: 60,
    },
    {
      title: "Danh mục",
      dataIndex: "name",
      render: (_, record) => (
        <div className="flex gap-3 items-center">
          <img
            src={record.image}
            alt={record.name}
            className="object-contain rounded-full w-9 h-9"
          />
          <p>{record.name}</p>
        </div>
      ),
    },

    {
      title: "Giá chỉ từ",
      dataIndex: "price",
      width: 110,
      render: (e) => <>{formatCurrency(e)}</>,
    },
    // TODO display tags
    {
      title: "Tags",
      dataIndex: "tags",
      render: (e) => (
        <Tooltip title={e?.map((item: any) => item?.name)?.join(", ")}>
          <p className="truncate">
            {e?.map((item: any) => item?.name)?.join(", ")},{" "}
          </p>{" "}
        </Tooltip>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      width: 110,
      render: (e) => <>{formatDate(e)}</>,
    },
    {
      dataIndex: "action",
      width: 60,
      render: (_, record) => (
        <Link
          href={
            "category/create?" +
            queryString.stringify({
              isEdited: true,
              data: JSON.stringify(record),
            })
          }
        >
          <Button type="text" shape="circle">
            <EditOutlined />
          </Button>
        </Link>
      ),
    },
  ];
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
      <AntdTable
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
              onConfirm={async () => {
                await remove();
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

export default Table;

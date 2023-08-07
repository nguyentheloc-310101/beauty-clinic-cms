import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
interface DataServiceType {
  key: React.Key;
  name: string;
  quantity: number;
  created_at: string;
}
const columns: ColumnsType<DataServiceType> = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Dịch vụ",
    dataIndex: "name",
  },
  {
    title: "Danh mục",
    dataIndex: "quantity",
  },
  {
    title: "Ngày tạo",
    dataIndex: "created_at",
  },
];

const data: DataServiceType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    quantity: 32,
    created_at: `London, Park Lane no. ${i}`,
  });
}
const TableService = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRow, setSelectedRow] = useState<number>(0);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
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
        dataSource={data}
        scroll={{ y: `calc(100vh - 396px)` }}
        rowClassName={(record) => {
          if (selectedRow == record?.key) {
            return "selected-row";
          }
          return "";
        }}
        footer={() => (
          <div className="w-full gap-[24px] flex justify-between pr-[50px] ">
            <div>{selectedRowKeys.length} dịch vụ được chọn</div>
            <div className="text-[#DC1F18] text-[14px] cursor-pointer leading-[20px] tracking-[1.25px] font-[700]">
              Xoá
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default TableService;

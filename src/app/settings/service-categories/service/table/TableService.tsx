import { useFetch, useRemove } from "@/common/hooks";
import { IServiceCategory } from "@/common/types";
import { formatDate } from "@/common/utils";
import { supabase } from "@/services";
import { Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
interface DataServiceType {
  id: string;
  isSelected: boolean;

  key: React.Key;
  name: string;

  category_id: string;
  created_at: string;
}
type Props = {
  selectedCategoryId: string;
};
const TableService = ({ selectedCategoryId }: Props) => {
  const { value: initialCategories } = useFetch<IServiceCategory[]>(() =>
    supabase.from("service-categories").select()
  );
  const categories =
    initialCategories?.map((category) => ({
      value: category.id,
      label: category.name,
    })) ?? [];

  const columns: ColumnsType<DataServiceType> = [
    {
      title: "STT",
      width: 57,
      render: (_e, _a, i) => <>{i + 1}</>,
    },
    {
      title: "Dịch vụ",
      dataIndex: "name",
    },
    {
      title: "Danh mục",
      dataIndex: "category_id",
      render: (e) => categories.find((item) => item.value == e)?.label,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      render: (e) => <>{formatDate(e)}</>,
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRow, setSelectedRow] = useState<number>(0);

  const { value, remove, selectKeys } = useRemove<DataServiceType[]>(
    "services",
    []
  );
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    selectKeys(newSelectedRowKeys as number[]);
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
          onClick: () =>
            setSelectedRow && setSelectedRow((record?.key as number) ?? 0),
        })}
        dataSource={value?.filter((item) =>
          selectedCategoryId ? item.category_id == selectedCategoryId : true
        )}
        scroll={{ y: `calc(100vh - 396px)` }}
        rowClassName={(record) => {
          if (selectedRow == record?.key) {
            return "selected-row";
          }
          return "";
        }}
        footer={() => (
          <div className="w-full gap-[24px] flex justify-between pr-[50px] ">
            <div>
              {value?.filter((item) => item.isSelected).length} dịch vụ được
              chọn
            </div>
            <Popconfirm
              title="Xóa thông tin"
              description="Lưu ý: Các thông tin chi tiết của dịch vụ cũng sẽ bị xóa theo!"
              onConfirm={() => remove()}
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

export default TableService;

"use client";
import { IServiceCategory } from "@/common/types";
import { Button, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import queryString from "query-string";
import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { supabase } from "@/services";
import { useFetch } from "@/common/hooks";

type Props = {};

export default function ServiceCategories({}: Props) {
  const { value: serviceCategories, setValue: setServiceCategories } = useFetch<
    IServiceCategory[]
  >(() => supabase.from("service-categories").select());

  async function handleDelete(
    currServiceCategory: IServiceCategory
  ): Promise<void> {
    const { error } = await supabase
      .from("service-categories")
      .delete()
      .eq("slug", currServiceCategory.slug);
    if (error) {
      console.log(error);
      return;
    }
    setServiceCategories(
      serviceCategories!.filter((item) => item.slug != currServiceCategory.slug)
    );
  }
  const columns: ColumnsType<IServiceCategory> = [
    {
      key: "action",
      width: 120,
      render: (currServiceCategory) => {
        return (
          <>
            <Tooltip title="Sửa">
              <Link
                href={
                  "/service-categories/create?" +
                  queryString.stringify({
                    isEdited: true,
                    data: JSON.stringify(currServiceCategory),
                  })
                }
              >
                <Button type="primary" shape="circle">
                  <EditOutlined />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip title="Xóa">
              <Button
                type="text"
                shape="circle"
                className="ml-2"
                danger
                onClick={() => handleDelete(currServiceCategory)}
              >
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (value) => <p>{value}</p>,
    },
  ];
  return (
    <section>
      <header className="flex justify-between gap-4 pb-4 items-center">
        <h2 className="min-w-fit">Danh mục dịch vụ</h2>
        <Link href="/service-categories/create">
          <Button type="primary">Thêm mới</Button>
        </Link>
      </header>
      <Table
        pagination={false}
        columns={columns}
        dataSource={serviceCategories!}
        className="min-w-max"
      />
    </section>
  );
}

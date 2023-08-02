"use client";
import { IServiceStep } from "@/common/types";
import { Button, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import queryString from "query-string";
import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { supabase } from "@/services";
import { useFetch } from "@/common/hooks";
import { getIdFromSupabaseStorage } from "@/common/utils";

type Props = {};

export default function Step({}: Props) {
  const { value: steps, setValue: setSteps } = useFetch<IServiceStep[]>(() =>
    supabase.from("service-steps").select()
  );
  async function handleDelete(curr: IServiceStep) {
    await supabase.from("doctors").delete().eq("id", curr.id);
    await supabase.storage
      .from("aura")
      .remove([getIdFromSupabaseStorage(curr.image)]);
    setSteps(steps?.filter((item) => item.id != curr.id)!);
  }
  const columns: ColumnsType<IServiceStep> = [
    {
      key: "action",
      width: 120,
      render: (curr) => {
        return (
          <>
            <Tooltip title="Sửa">
              <Link
                href={
                  "/service-steps/create?" +
                  queryString.stringify({
                    isEdited: true,
                    data: JSON.stringify(curr),
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
                onClick={() => handleDelete(curr)}
              >
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: "Ảnh minh họa",
      dataIndex: "image",
      key: "image",
      render: (src) => (
        <img
          src={src}
          alt={src}
          className="h-20 w-20 rounded-md object-cover"
        />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "desc",
      key: "desc",
      render: (value) => <p>{value}</p>,
    },
  ];
  return (
    <section>
      <header className="flex justify-between gap-4 pb-4 items-center">
        <h2 className="min-w-fit"> Lộ trình điều trị</h2>
        <Link href="/service-steps/create">
          <Button type="primary">Thêm mới</Button>
        </Link>
      </header>
      <Table
        pagination={false}
        columns={columns}
        dataSource={steps!}
        className="min-w-max"
      />
    </section>
  );
}

"use client";
import { IDoctor, IServiceCategory } from "@/common/types";
import { Button, Input, Popconfirm, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import Link from "next/link";
import queryString from "query-string";
import { supabase } from "@/services";
import { getIdFromSupabaseStorage } from "@/common/utils";
import { useFetch } from "@/common/hooks";

type Props = {};
export default function Service({}: Props) {
  const { value: serviceCategories } = useFetch<IServiceCategory[]>(() =>
    supabase.from("services").select()
  );
  const { value: doctors, setValue: setDoctors } = useFetch<IDoctor[]>(() =>
    supabase.from("doctors").select()
  );

  async function handleDelete(currDoctor: IDoctor): Promise<void> {
    try {
      await supabase.from("doctors").delete().eq("id", currDoctor.id);
      await supabase.storage
        .from("aura")
        .remove([getIdFromSupabaseStorage(currDoctor.image)]);
      setDoctors(doctors?.filter((doctor) => doctor.id != currDoctor.id)!);
    } catch (error) {
      console.log(error);
    }
  }
  const columns: ColumnsType<IDoctor> = [
    {
      key: "action",
      width: 120,
      render: (currDoctor) => (
        <>
          <Tooltip title="Sửa">
            <Link
              href={
                "/doctors/create?" +
                queryString.stringify({
                  isEdited: true,
                  data: JSON.stringify(currDoctor),
                })
              }
            >
              <Button type="primary" shape="circle">
                <EditOutlined />
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Xóa thông tin bác sĩ"
              description="Nếu đồng ý thông tin bác sĩ sẽ bị xóa vĩnh viễn!"
              onConfirm={() => handleDelete(currDoctor)}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Button type="text" shape="circle" className="ml-2" danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
    {
      title: "Avatar",
      width: 50,
      dataIndex: "image",
      key: "image",
      render: (src) => (
        <img
          src={src}
          alt={src}
          className="h-10 w-10 rounded-md object-cover"
        />
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "K.Nghiệm",
      dataIndex: "experience_year",
      key: "experience_year",
      render: (value) => <p className="text-center">{value}</p>,
      width: 50,
    },
    {
      title: "Chuyên ngành",
      dataIndex: "major",
      key: "major",
      width: 150,
    },
    {
      title: "Thông tin bác sĩ",
      dataIndex: "desc_doctor",
      render: (desc_doctor) => (
        <Tooltip title={desc_doctor}>
          <p className="truncate overflow-hidden max-w-[200px]">
            {desc_doctor}
          </p>
        </Tooltip>
      ),
      key: "desc_doctor",
    },
    {
      title: "Thuộc dịch vụ",
      dataIndex: "service_id",
      render: (service_id) => (
        <p className="truncate overflow-hidden max-w-[200px]">
          {serviceCategories
            ?.filter((c) => c.id == service_id)
            .map((c) => c.name)}
        </p>
      ),
      key: "service_id",
    },
  ];

  const [searchText, setSearchText] = useState<string>("");
  return (
    <>
      <header className="flex justify-between gap-4 pb-4 items-center">
        <h2 className="min-w-fit">Bác sĩ</h2>
        <Link href="/doctors/create">
          <Button type="primary">Thêm mới</Button>
        </Link>
        <Input
          placeholder="Tìm kiếm tên bác sĩ"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </header>
      <Table
        pagination={false}
        columns={columns}
        dataSource={doctors?.filter((doctor) =>
          doctor.name?.toLowerCase().includes(searchText?.toLowerCase() ?? "")
        )}
        className="min-w-max"
      />
    </>
  );
}

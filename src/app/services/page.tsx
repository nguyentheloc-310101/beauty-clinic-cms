"use client";
import { IDoctor } from "@/common/types";
import { Button, Input, Popconfirm, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import queryString from "query-string";
import { supabase } from "@/services";
import { getIdFromSupabaseStorage } from "@/common/utils";

type Props = {};
export default function Service({}: Props) {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);

  useEffect(() => {
    const asyncFunc = async () => {
      const { data } = await supabase.from("doctors").select();
      setDoctors(data as IDoctor[]);
    };
    asyncFunc();
  }, []);

  async function handleDelete(currDoctor: IDoctor): Promise<void> {
    let { error: error1 } = await supabase
      .from("doctors")
      .delete()
      .eq("id", currDoctor.id);
    const { error: error2 } = await supabase.storage
      .from("aura")
      .remove([getIdFromSupabaseStorage(currDoctor.image)]);
    if (error1) console.log(error1);
    if (error2) console.log(error2);
    else setDoctors(doctors.filter((doctor) => doctor.id != currDoctor.id));
  }
  const columns: ColumnsType<IDoctor> = [
    {
      key: "action",
      render: (currDoctor) => (
        <>
          <Tooltip title="Sửa">
            <Link
              href={
                "/services/create?" +
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
    },
    {
      title: "Chuyên ngành",
      dataIndex: "major",
      key: "major",
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
  ];

  const [searchText, setSearchText] = useState<string>("");
  return (
    <>
      <header className="flex justify-between gap-4 pb-4 items-center">
        <h1 className="min-w-fit">Dịch vụ</h1>
        <Link href="/services/create">
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
        dataSource={doctors.filter((doctor) =>
          doctor.name?.toLowerCase().includes(searchText?.toLowerCase() ?? "")
        )}
        className="min-w-max"
      />
    </>
  );
}

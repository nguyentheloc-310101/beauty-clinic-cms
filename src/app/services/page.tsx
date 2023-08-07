"use client";

import { IService } from "@/common/types";
import { useState } from "react";
import Card, { NewCardButton } from "../components/card";
import { SERVICES } from "@/common/dump-data";
import { Button, Checkbox, Popconfirm } from "antd";

type Props = {};

interface IDisplayService extends IService {
  isSelected?: boolean;
}
export default function Service({ }: Props) {
  const [data, setData] = useState<IDisplayService[]>(SERVICES);
  console.log(data);
  return (
    <div className="h-full flex flex-col justify-between ">
      <section className="flex flex-wrap gap-6 p-6">
        <NewCardButton title="THÊM BÀI VIẾT MỚI" createUrl="/services/create" />
        {data.map((item, i: number) => (
          <Card
            key={i}
            image={item.image}
            title={item.name}
            description={item.content}
            editUrl={"services/create"}
            isSelected={item.isSelected ?? false}
            onSelectCallBack={(isSelected) => {
              const tempData = JSON.parse(JSON.stringify(data));
              tempData[i].isSelected = isSelected;
              setData(tempData);
            }}
          />
        ))}
      </section>
      <footer className="flex justify-between p-6 items-center bg-white">
        <div className="flex gap-3 text-caption items-center">
          <p className="text-caption">
            {data.filter((item) => item.isSelected).length} bài viết được chọn |
          </p>
          <Checkbox
            onChange={(e) => {
              setData(
                data.map((item) => ({ ...item, isSelected: e.target.checked }))
              );
            }}
            checked={data.every((item) => item.isSelected)}
          >
            <p className="!text-caption">Chọn tất cả bài viết</p>
          </Checkbox>

          <Popconfirm
            title="Xóa thông tin"
            description="Nếu đồng ý các thông tin trên sẽ bị xóa vĩnh viễn!"
            onConfirm={() => {
              setData([...data.filter((item) => !item.isSelected)]);
            }}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <Button type="text" danger>
              Xóa bài viết này
            </Button>
          </Popconfirm>
        </div>
        <div>
          <Button className="w-40 mr-[10px]">Hoàn tác</Button>
          <Button className="w-40" type="primary">
            Lưu
          </Button>
        </div>
      </footer>
    </div>
  );
}

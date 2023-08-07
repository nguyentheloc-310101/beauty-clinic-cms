"use client";

import { IService } from "@/common/types";
import Card, { NewCardButton } from "../components/card";
import { Button, Checkbox, Popconfirm } from "antd";
import { useRemove } from "@/common/hooks";
import queryString from "query-string";

type Props = {};

interface IDisplayService extends IService {
  isSelected: boolean;
}
export default function Service({ }: Props) {
  const { value, remove, select, selectAll } = useRemove<IDisplayService[]>(
    "services",
    []
  );
  return (
    <div className="h-full flex flex-col justify-between ">
      <section className="flex flex-wrap gap-6 p-6">
        <NewCardButton title="THÊM BÀI VIẾT MỚI" createUrl="/services/create" />
        {value?.map((item, i: number) => (
          <Card
            key={i}
            image={item.image}
            title={item.name}
            // TODO display category
            description={item.description}
            editUrl={
              "services/create?" +
              queryString.stringify({
                isEdited: true,
                data: JSON.stringify(value[i]),
              })
            }
            isSelected={item.isSelected ?? false}
            onSelectCallBack={() => select(i)}
          />
        ))}
      </section>
      <footer className="flex justify-between p-6 items-center bg-white">
        <div className="flex gap-3 text-caption items-center">
          <p className="text-caption">
            {value?.filter((item) => item.isSelected).length} bài viết được chọn
            |
          </p>
          <Checkbox
            onChange={(e) => selectAll(e.target.checked)}
            checked={value?.every((item) => item.isSelected)}
          >
            <p className="!text-caption">Chọn tất cả bài viết</p>
          </Checkbox>

          <Popconfirm
            title="Xóa thông tin"
            description="Nếu đồng ý các thông tin trên sẽ bị xóa vĩnh viễn!"
            onConfirm={() => remove()}
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

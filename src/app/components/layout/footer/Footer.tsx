import { Button, Checkbox, Popconfirm } from "antd";
import React from "react";

type FooterProps = {
  data?: any;
  onChangeCheckBox?: any;
  onConFirmDelete?: any;
  leftAction: boolean;
  onOk: any;
  onCancel: any;
};
//when leftAction is true, please assign function callbacks for 2 actions
const FooterCustom = (props: FooterProps) => {
  const {
    onOk,
    onCancel,
    data,
    leftAction,
    onChangeCheckBox,
    onConFirmDelete,
  } = props;
  return (
    <footer
      className={`flex ${
        leftAction ? "justify-between" : "justify-end"
      }  p-6 items-center bg-white`}
    >
      {leftAction && (
        <div className="flex gap-3 text-caption items-center">
          <p className="text-caption">
            {data?.filter((item: any) => item.isSelected).length} bài viết được
            chọn |
          </p>
          <Checkbox
            onChange={onChangeCheckBox}
            checked={data?.every((item: any) => item.isSelected)}
          >
            <p className="!text-caption">Chọn tất cả bài viết</p>
          </Checkbox>

          <Popconfirm
            title="Xóa thông tin"
            description="Nếu đồng ý các thông tin trên sẽ bị xóa vĩnh viễn!"
            onConfirm={onConFirmDelete}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <Button type="text" danger>
              Xóa bài viết này
            </Button>
          </Popconfirm>
        </div>
      )}

      <div>
        <Button onClick={onCancel} className="w-40 mr-[10px]">
          Hoàn tác
        </Button>
        <Button onClick={onOk} className="w-40" type="primary">
          Lưu
        </Button>
      </div>
    </footer>
  );
};

export default FooterCustom;

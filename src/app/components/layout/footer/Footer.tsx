"use client";
import { Button, Checkbox, Popconfirm } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PopUpConfirm from "../../popup-confirm/PopupConfirm";
import lottieMagic from "../../../../../public/lottie/star_magic.json";

type FooterProps = {
  data?: any;
  onChangeCheckBox?: (isSelected: boolean) => void;
  onConFirmDelete?: any;
  leftAction: boolean;
  rightAction: boolean;
  onOk?: any;
  textBtnRight?: string;
  isUploading?: boolean;
};
//when leftAction is true, please assign function callbacks for 2 actions
const FooterCustom = (props: FooterProps) => {
  const {
    onOk,
    data,
    leftAction,
    rightAction,
    onChangeCheckBox,
    textBtnRight,
    isUploading,
    onConFirmDelete,
  } = props;
  const router = useRouter();
  const [confirmEditClinic, setConfirmEditClinic] = useState<boolean>(false);
  return (
    <footer
      className={`flex ${leftAction ? "justify-between" : "justify-end"
        }  p-6 items-center bg-white border-neutral-n-20 border-t border-solid`}
    >
      {leftAction && (
        <div className="flex gap-3 text-caption items-center">
          <p className="text-caption">
            {data?.filter((item: any) => item.isSelected).length} bài viết được
            chọn |
          </p>
          <Checkbox
            onChange={(e) => onChangeCheckBox?.(e.target.checked)}
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
              Xóa đã chọn
            </Button>
          </Popconfirm>
        </div>
      )}

      {rightAction && (
        <div>
          <Button onClick={() => router.back()} className="w-40 mr-[10px]">
            Hoàn tác
          </Button>
          <Button
            className="w-40"
            type="primary"
            onClick={() => setConfirmEditClinic(true)}
            loading={isUploading}
          >
            {textBtnRight}
          </Button>
          {confirmEditClinic && (
            <PopUpConfirm
              loading={isUploading}
              title={"Thêm mới"}
              description={
                "Khi bấm “Xác nhận” thì thông tin mới sẽ được cập nhật và không thể khôi phục thông tin cũ."
              }
              color={"#BC2449"}
              lottie={lottieMagic}
              onCancel={() => setConfirmEditClinic(false)}
              onOk={onOk}
            />
          )}
        </div>
      )}
    </footer>
  );
};

export default FooterCustom;

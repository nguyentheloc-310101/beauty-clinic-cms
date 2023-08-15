import React from "react";
import { cn } from "@/common/utils";

const TYPES = {
  create: {
    display: "Tạo mới",
    className: "bg-[#FEF9E1] text-[#E8BA02]",
  },
  hide: {
    display: "Ẩn/Hiện",
    className: "bg-[#FFEBEB] text-[#DC1F18]",
  },
  edit: {
    display: "Chỉnh sửa",
    className: "bg-[#EBF4FF] text-[#006AF5] ",
  },
};

type Props = {
  action: TAction;
  className?: string;
};

export type TAction = "create" | "hide" | "edit";
export default function Tag({ action, className }: Props) {
  return (
    <div
      className={cn(
        "rounded-lg py-1 px-2 text-neutral-n-50 inline-block",
        TYPES[action].className,
        className
      )}
    >
      {TYPES[action].display}
    </div>
  );
}

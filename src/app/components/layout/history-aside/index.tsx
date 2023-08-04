import { cn } from "@/common/utils";
import React from "react";

type Props = {
  className?: string;
};

export default function HistoryAside({ className }: Props) {
  return (
    <aside className={cn("w-[354px] bg-white", className)}>
      <header className="border-b-4 border-neutral-n-20 border-solid">
        <h6 className="mx-6 my-5"> Lịch sử</h6>
      </header>
      <p className="m-5">Tính năng cập nhật trong bản kế tiếp</p>
    </aside>
  );
}

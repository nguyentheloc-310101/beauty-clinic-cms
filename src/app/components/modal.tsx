import { Button } from "antd";
import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { cn } from "@/common/utils";

type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
};
export default function Modal({ title, children, className }: Props) {
  const router = useRouter();
  return (
    <div
      className={
        "fixed top-0 bottom-0 left-0 right-0 backdrop-blur-sm flex justify-center items-center"
      }
    >
      <section className="rounded-lg overflow-hidden bg-white">
        <header className="bg-primary p-6 flex justify-between items-center">
          <h6 className="font-bold text-white">{title}</h6>
          <Button
            type="text"
            className="text-white hover:!text-neutral-n-50"
            onClick={() => router.back()}
          >
            <CloseOutlined />
          </Button>
        </header>
        <div className={cn("p-6 ", className)}>{children}</div>
      </section>
    </div>
  );
}

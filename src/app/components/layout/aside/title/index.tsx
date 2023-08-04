"use client";
export * from "./subtitle";

import { cn } from "@/common/utils";
import React, { HTMLAttributes } from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  disabled?: boolean;
  Icon?: React.ReactNode;
  isSelected?: boolean;
  title: string;
  children?: React.ReactNode;
  url?: string;
}

// TODO implement disabled Title
export default function Title({
  className,
  disabled,
  Icon,
  title,
  children,
  url,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const isSelected = pathname == url;
  const [isShown, setIsShown] = React.useState<boolean>(false);
  return (
    <>
      <div
        className={cn(
          "rounded-lg hover:bg-primary-60 px-6 py-2 w-[268px] flex text-white",
          { "": disabled },
          { "bg-primary-80": isSelected },
          className
        )}
        onClick={() => (url ? router.push(url) : setIsShown((prev) => !prev))}
      >
        {Icon}
        <p className="text-subtitle1 ml-[10px] flex-1 mr-4 text-white">
          {title}
        </p>
        {children && (isShown ? <DownOutlined /> : <UpOutlined />)}
      </div>
      {isShown ? children : null}
    </>
  );
}

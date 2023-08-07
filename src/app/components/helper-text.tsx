import { cn } from "@/common/utils";
import React from "react";
import { InfoCircleFilled } from "@ant-design/icons";

interface Props extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
}

export default function HelperText({ children, className }: Props) {
  return (
    <span className={cn("inline-flex text-[#767A7F] mt-1", className)}>
      <InfoCircleFilled className="mr-1 self-start w-4 h-4" />
      <p className="text-body2 text-[#767A7F]">{children}</p>
    </span>
  );
}

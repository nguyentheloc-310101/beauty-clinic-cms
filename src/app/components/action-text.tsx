import { cn } from "@/common/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children: React.ReactNode;
}

export default function ActionText({ className, children, ...props }: Props) {
  return (
    <p
      className={cn(
        "text-primary hover:text-primary-80 active:text-primary-60 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

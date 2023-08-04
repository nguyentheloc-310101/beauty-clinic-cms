"use client";
import { cn } from "@/common/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

interface SubProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  url: string;
}
export function Subtitle({ className, disabled, children, url }: SubProps) {
  const pathname = usePathname();
  const isSelected = pathname == url;
  return (
    <Link href={url}>
      <p
        className={cn(
          "rounded-lg hover:bg-primary-60 py-2 pl-[58px] pr-6 text-subtitle1 w-[268px] text-white",
          { "": disabled },
          { "bg-primary-80": isSelected },
          className
        )}
      >
        {children}
      </p>
    </Link>
  );
}

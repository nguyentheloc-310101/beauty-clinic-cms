"use client";
import { cn } from "@/common/utils";
import { Checkbox, Form } from "antd";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  title: string;
  children: React.ReactNode;
  name?: string;
  optional?: boolean;
}

// TODO make more nice *
export default function Section({
  className,
  title,
  children,
  name,
  optional,
}: Props) {
  return (
    <section>
      <h6 className="mb-3">
        {optional && (
          <Form.Item name={name}>
            <Checkbox />
          </Form.Item>
        )}
        {title} {!optional && <b className="text-primary">*</b>}
      </h6>
      <div className={cn("", className)}>{children}</div>
    </section>
  );
}

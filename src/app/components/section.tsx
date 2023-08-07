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
      <h6 className="mb-3 font-bold">
        {optional ? (
          <Form.Item name={name}>
            <Checkbox>
              <h6 className="font-bold">{title}</h6>
            </Checkbox>
          </Form.Item>
        ) : (
          <>
            {title} <b className="text-primary">*</b>
          </>
        )}
      </h6>
      <div className={cn("", className)}>{children}</div>
    </section>
  );
}

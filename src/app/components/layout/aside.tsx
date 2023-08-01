"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const CATEGORIES: { name: string; path: string }[] = [
  { name: "Dịch vụ", path: "/services" },
  { name: "Dịch vụ", path: "/services" },
];

export default function Aside({}: Props) {
  const router = useRouter();
  return (
    <aside className="p-5 flex flex-col gap-4 max-w-[300px]">
      {CATEGORIES.map((category, i: number) => (
        <Button
          type="primary"
          key={i}
          onClick={() => router.push(category.path)}
        >
          {category.name}
        </Button>
      ))}
    </aside>
  );
}

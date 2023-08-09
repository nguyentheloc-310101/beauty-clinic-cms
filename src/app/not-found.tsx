"use client";
import Link from "next/link";
import { Button } from "antd";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col items-center gap-6">
        <h4>Trang chưa hoàn thiện hoặc không tìm thấy</h4>
        <Link href="/">
          <Button type="primary">Trở về</Button>
        </Link>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import Header from "./header";
import Aside from "./aside";
import { ConfigProvider } from "antd";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#BC2449" } }}
      componentSize="large"
    >
      <Header />
      <div className="flex [&>*]:flex-1 [&>*]:overflow-auto">
        <Aside />
        {children}
      </div>
    </ConfigProvider>
  );
}

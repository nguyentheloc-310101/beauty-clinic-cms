"use client";
import React, { useEffect, useState } from "react";
import Header from "./header";
import Aside from "./aside";
import { ConfigProvider } from "antd";
import { useUserStore } from "@/common/store";
import Auth from "./auth";
import MessageProvider from "@/common/providers/message";

type Props = {
  children: React.ReactNode;
};

const validateMessages = {
  required: "Vui lòng nhập mục này!",
};

export default function Layout({ children }: Props) {
  const isSignIn = useUserStore((state) => state.isSignedIn);

  // all this code is for fix hydrate problem https://nextjs.org/docs/messages/react-hydration-error
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return <></>;
  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#BC2449" } }}
      componentSize="large"
      form={{ validateMessages }}
    >
      <MessageProvider>
        <div className="flex h-screen">
          <Aside />
          <div className="flex-1 flex flex-col h-full">
            <Header />
            {isSignIn ? (
              <main className="flex-1 bg-[#F5F5F5]">{children}</main>
            ) : (
              <Auth />
            )}
          </div>
        </div>
      </MessageProvider>
    </ConfigProvider>
  );
}

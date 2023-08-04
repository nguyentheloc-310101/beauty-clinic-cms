"use client";
import React, { useEffect, useState } from "react";
import Header from "./header";
import Aside from "./aside";
import { ConfigProvider } from "antd";
import { useUserStore } from "@/common/store";
import Auth from "./auth";
import HistoryAside from "./history-aside";
import MessageProvider from "@/common/providers/message";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  // NOTE all this code is for fix hydrate problem https://nextjs.org/docs/messages/react-hydration-error
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const isSignIn = useUserStore((state) => state.isSignedIn);
  if (!isClient) return <></>;

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#BC2449" } }}
      componentSize="large"
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

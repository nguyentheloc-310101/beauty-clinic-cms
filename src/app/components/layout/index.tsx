"use client";
import React, { useEffect, useState } from "react";
import Header from "./header";
import Aside from "./aside";
import { ConfigProvider } from "antd";
import { useUserStore } from "@/common/store";
import Auth from "./auth";

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
      <div className="flex h-screen">
        <Aside />
        <div className="flex-1 flex flex-col">
          <Header />
          {isSignIn ? (
            <main className="p-6 overflow-auto flex-1">{children}</main>
          ) : (
            <Auth />
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}

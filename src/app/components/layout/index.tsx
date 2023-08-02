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
      <Header />
      {isSignIn ? (
        <div className="flex [&>*]:flex-1 [&>*]:overflow-auto">
          <Aside />
          <main className="p-4">{children}</main>
        </div>
      ) : (
        <Auth />
      )}
    </ConfigProvider>
  );
}

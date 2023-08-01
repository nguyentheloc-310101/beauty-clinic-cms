import React from "react";
import Header from "./header";
import Aside from "./aside";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <div className="flex [&>*]:flex-1 [&>*]:overflow-auto">
        <Aside />
        {children}
      </div>
    </>
  );
}

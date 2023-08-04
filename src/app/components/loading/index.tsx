import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Loading: React.FC = () => (
  <div className="flex items-center justify-center w-full h-full">
    <Spin indicator={antIcon} />
  </div>
);

export default Loading;

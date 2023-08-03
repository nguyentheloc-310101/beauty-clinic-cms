import { ReactNode } from "react";
import {
  HomeOutlined,
  AppstoreOutlined,
  ContactsOutlined,
  SettingOutlined,
} from "@ant-design/icons";

type TRoute = {
  Icon: ReactNode;
  title: string;
  url?: string;
  subTitle?: { name: string; url: string }[];
};

export const ROUTES: TRoute[] = [
  {
    Icon: <HomeOutlined />,
    title: "Trang chủ",
    url: "/home",
  },

  {
    Icon: <AppstoreOutlined />,
    title: "Chi tiết dịch vụ",
    url: "/services",
  },
  {
    Icon: <ContactsOutlined />,
    title: "Liên hệ",
    url: "/contact",
  },
  {
    Icon: <SettingOutlined />,
    title: "Cài đặt thông tin",
    subTitle: [
      { name: "Danh mục dịch vụ", url: "/settings/service-categories" },
      { name: "Dịch vụ", url: "/settings/services" },
      { name: "Cơ sở", url: "/settings/premises" },
    ],
  },
];

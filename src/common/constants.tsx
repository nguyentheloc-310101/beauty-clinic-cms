import { ReactNode } from "react";
import {
  HomeOutlined,
  AppstoreOutlined,
  ContactsOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

type TRoute = {
  Icon: ReactNode;
  title: string;
  headTitle?: string;
  url?: string;
  subTitle?: { name: string; url: string; head: string }[];
};

export const ROUTES: TRoute[] = [
  {
    Icon: <HomeOutlined />,
    title: "Trang chủ",
    headTitle: "Điều chỉnh trang chủ",
    url: "/home",
  },
  {
    Icon: <AppstoreOutlined />,
    title: "Chi tiết dịch vụ",
    headTitle: "Chi tiết dịch vụ",
    url: "/services",
  },
  {
    Icon: <UnorderedListOutlined />,
    headTitle: "Điều chỉnh danh sách danh mục",
    title: "Danh sách danh mục",
    url: "/service-page", // NOTE  chả biết đặt tên như lào :>>>
  },
  {
    Icon: <ContactsOutlined />,
    headTitle: "Điều chỉnh liên hệ",
    title: "Liên hệ",
    url: "/contact",
  },
  {
    Icon: <SettingOutlined />,
    title: "Cài đặt thông tin",
    subTitle: [
      {
        name: "Danh mục",
        url: "/settings/category",
        head: "Danh mục",
      },
      {
        name: "Dịch vụ",
        url: "/settings/service",
        head: "Dịch vụ",
      },
      {
        name: "Cơ sở (Clinic)",
        url: "/settings/clinics",
        head: "Cơ sở (Clinic)",
      },
      { name: "Bác sĩ", url: "/settings/doctors", head: "Bác sĩ" },
    ],
  },
];

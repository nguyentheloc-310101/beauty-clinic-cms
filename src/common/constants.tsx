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
        name: "Danh mục & dịch vụ",
        url: "/settings/service-categories",
        head: "Danh mục & dịch vụ",
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

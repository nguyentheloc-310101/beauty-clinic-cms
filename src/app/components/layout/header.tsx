"use client";
import { ROUTES } from "@/common/constants";
import { useUserStore } from "@/common/store";
import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Button } from "antd";
import type { MenuProps } from "antd";
import { AiOutlineDown } from "react-icons/ai";
import { usePathname } from "next/navigation";

const Header = () => {
  const signOut = useUserStore((state) => state.signOut);
  const pathname = usePathname();
  const items: MenuProps["items"] = [
    {
      label: <a href="">Thông tin tài khoản</a>,
      key: "0",
    },
    {
      label: <a href="">Cập nhật mật khẩu</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <div onClick={signOut}>Đăng xuất</div>,
      key: "2",
    },
  ];
  return (
    <header className="flex justify-between p-4 items-center bg-white border-b border-solid border-neutral-n-20">
      <h4 className="flex-1 font-semibold">
        Điều chỉnh {/* TODO show header for subTitle */}
        {ROUTES.filter(
          (route) => route.url == pathname
        )?.[0]?.title.toLowerCase()}
      </h4>
      {/* <Button onClick={signOut}>Đăng suất</Button> */}
      <Dropdown menu={{ items }}>
        <div className="flex lg:gap-[12px] lg:h-[40px] w-fit items-center justify-center">
          <Avatar
            size={{ xs: 12, sm: 20, md: 28, lg: 42, xl: 50, xxl: 50 }}
            icon={<AntDesignOutlined />}
          />
          <div>
            <div className="lg:text-[14px] lg:font-[400] lg:leading-[20px] lg:tracking-[0.25px]">
              Nguyen Huong Bao Tran
            </div>
            <div className="lg:text-[12px] text-[#8F9499] lg:font-[400] lg:leading-[18px] lg:tracking-[0.4px]">
              @username
            </div>
          </div>
          <AiOutlineDown className="lg:w-[16px] lg:h-[16px] lg:ml-[12px]" />
        </div>
      </Dropdown>
    </header>
  );
};

export default Header;

"use client";
import { ROUTES } from "@/common/constants";
import { useUserStore } from "@/common/store";
import { Button } from "antd";
import { usePathname } from "next/navigation";

const Header = () => {
  const signOut = useUserStore((state) => state.signOut);
  const pathname = usePathname();
  return (
    <header className="flex justify-between p-4 items-center bg-white">
      <h4 className="flex-1 font-semibold">
        Điều chỉnh {/* TODO show header for subTitle */}
        {ROUTES.filter(
          (route) => route.url == pathname
        )?.[0].title.toLowerCase()}
      </h4>
      <Button onClick={signOut}>Đăng suất</Button>
    </header>
  );
};

export default Header;

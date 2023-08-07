import { Button, Select } from "antd";
import React from "react";

const HeaderServiceSettings = () => {
  return (
    <div className="flex items-center justify-between h-[46px]">
      <div className="text-[20px] text-[#36383A] font-[700] leading-[30px] tracking-[-.15px]">
        Dịch vụ
      </div>
      <div className="flex gap-[10px]">
        <div>
          <Select
            className="w-[288px]"
            showSearch
            placeholder="Chọn danh mục"
            optionFilterProp="children"
            options={[
              {
                value: "1",
                label: "Mắt",
              },
              {
                value: "2",
                label: "Mũi",
              },
            ]}
          />
        </div>
        <Button className="bg-[#BC2449] h-full w-[70px] px-[24px] py-[12px]  text-white">
          +
        </Button>
      </div>
    </div>
  );
};

export default HeaderServiceSettings;

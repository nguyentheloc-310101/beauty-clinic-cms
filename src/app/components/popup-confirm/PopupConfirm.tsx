import { Spin } from "antd";

import Lottie from "lottie-react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import ButtonDefault from "../common/buttons/ButtonDefault";
type PopUpConfirmProps = {
  title: string;
  description: string | ReactNode;
  highlight?: string;
  color: string;
  lottie: any;
  onCancel: any;
  onOk: any;
  loading?: boolean;
  btnLeftTitle?: string;
  btnRightTitle?: string;
};
const PopUpConfirm = ({
  title,
  description,
  highlight,
  color,
  lottie,
  onCancel,
  onOk,
  loading,
  btnLeftTitle = "Tiếp tục chỉnh sửa",
  btnRightTitle = "Xác nhận",
}: PopUpConfirmProps) => {
  return (
    <>
      <div className="z-[1000] fixed top-0 left-0 w-full h-full bg-black/20 p-8 backdrop-blur-sm">
        <div className="overflow-auto h-full">
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col relative  overflow-auto bg-white rounded-2xl">
              <Spin spinning={loading}>
                <div className="p-6 flex flex-col relative  overflow-auto bg-white rounded-2xl lg:w-[448px] lg:h-[612px]">
                  <div className="flex items-center justify-center w-full relative">
                    <div
                      className={`text-center text-[20px] lg:text-[34px] lg:text-[#BC2449] font-[600] font-['Be Vietnam Pro']`}
                    >
                      {title}
                    </div>
                    <XMarkIcon
                      className={`w-6 h-6 absolute right-4 lg:top-2 lg:right-6 text-[#BC2449] cursor-pointer hover:text-[#464749]`}
                      onClick={onCancel}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-center items-center lg:my-[48px]">
                      <Lottie
                        animationData={lottie}
                        loop={true}
                        className="lg:w-[400px] lg:h-[300px] h-[250px] object-cover"
                      />
                    </div>
                    <div className="text-center text-body1">
                      {description}
                      <p className={`text-[${color}]`}>{highlight}</p>
                    </div>
                  </div>
                  <div className="mt-[10px] lg:mt-[2px]">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="hidden lg:block">
                        <ButtonDefault
                          titleBt={btnLeftTitle}
                          borderBt={`1px solid ${color}`}
                          bgColor="white"
                          textColor={color}
                          heightBt="44px"
                          typeBt="button"
                          onclick={onCancel}
                        />
                      </div>
                      <div className="block lg:hidden">
                        <ButtonDefault
                          titleBt={"Trở lại"}
                          borderBt={`1px solid ${color}`}
                          bgColor="white"
                          textColor={color}
                          heightBt="44px"
                          typeBt="button"
                          onclick={onCancel}
                        />
                      </div>

                      <ButtonDefault
                        titleBt={btnRightTitle}
                        heightBt="44px"
                        typeBt="submit"
                        onclick={onOk}
                        bgColor={color}
                        isLoading={loading}
                      />
                    </div>
                  </div>
                </div>
              </Spin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUpConfirm;

import { Radio } from "antd";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";

type Props = {
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  editUrl: string;
  isSelected?: boolean;
  experience?: string;
  major?: string;
  onSelectCallBack: (isSelected: boolean) => void;
};

export default function Card({
  image,
  title,
  subtitle,
  description,
  editUrl,
  isSelected,
  experience,
  major,
  onSelectCallBack,
}: Props) {
  // useEffect(() => {
  //   setIsSelected(initialIsSelected ?? false);
  // }, [isSelected]);
  return (
    <section
      className="rounded-lg overflow-hidden relative outline-primary hover:outline outline-1 bg-white hover:bg-[#FCEEF2]"
      onClick={() => onSelectCallBack(!isSelected)}
    >
      <img
        className="w-[196px] h-[196px] object-cover"
        src={image}
        alt={title}
      />
      <div className="flex justify-between m-3 gap-4">
        <div>
          <p className="text-subtitle2 font-bold">{title}</p>
          {subtitle && <p className="text-caption my-[6px]">{subtitle}</p>}
          <p className="text-caption ">{description}</p>
          <p className="text-caption ">{experience}</p>
          <p className="text-caption ">{major}</p>
        </div>
        <Link href={editUrl} className="self-end">
          <EditOutlined className="text-[#8F9499] " />
        </Link>
      </div>
      <Radio className="top-3 right-3 absolute" checked={isSelected} />
    </section>
  );
}

interface NewCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  createUrl: string;
}
export const NewCardButton = ({ createUrl, title, ...props }: NewCardProps) => {
  return (
    <Link href={createUrl ?? ""}>
      <div
        {...props}
        className="rounded-lg h-[288px] w-[196px] flex justify-center items-center  primary outline-neutral-n-50 outline-dashed outline-1 bg-white cursor-pointer
     hover:outline-[#BC2449] [&_*]:hover:!text-[#BC2449] [&_*]:!text-neutral-n-50 hover:bg-[#FCEEF2]"
      >
        <div className="text-center">
          <PlusOutlined />
          <p className="mt-3 text-caption ">{title}</p>
        </div>
      </div>
    </Link>
  );
};

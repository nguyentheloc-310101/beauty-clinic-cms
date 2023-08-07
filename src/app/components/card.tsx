import { Radio } from "antd";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";

type Props = {
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  editUrl: string;
  isSelected?: boolean;

  onSelectCallBack: (isSelected: boolean) => void;
};

export default function Card({
  image,
  title,
  subtitle,
  description,
  editUrl,
  isSelected,
  onSelectCallBack,
}: Props) {
  // useEffect(() => {
  //   setIsSelected(initialIsSelected ?? false);
  // }, [isSelected]);
  return (
    <section
      className="rounded-lg overflow-hidden relative outline-primary hover:outline outline-1 bg-white"
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
        </div>
        <Link href={editUrl} className="self-end">
          <EditOutlined />
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
  console.log(createUrl);
  return (
    <div
      {...props}
      className="rounded-lg h-[288px] w-[196px] flex justify-center items-center  primary outline-neutral-n-50 outline-dashed outline-1 bg-white cursor-pointer
     hover:outline-neutral-n-80 [&_*]:hover:!text-neutral-n-80 [&_*]:!text-neutral-n-50"
    >
      <Link href={createUrl ?? ""}>
        <div className="text-center">
          <PlusOutlined />
          <p className="mt-3 text-caption ">{title}</p>
        </div>
      </Link>
    </div>
  );
};

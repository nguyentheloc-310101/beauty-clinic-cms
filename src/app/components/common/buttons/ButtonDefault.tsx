import { Button } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { ReactNode } from 'react';

interface Props {
  typeBt?: 'button' | 'submit' | 'reset';
  titleBt: ReactNode;
  isLoading?: boolean;
  size?: SizeType;
  className?: string;
  onclick?: any;
  borderRadius?: string;
  bgColor?: string;
  textColor?: string;
  icon?: ReactNode;
  widthBt?: string;
  borderBt?: string;
  heightBt?: string;
  disabled?: boolean;
}
const ButtonDefault = (props: Props) => {
  let {
    typeBt = 'submit',
    titleBt,
    isLoading = false,
    size = 'large',
    className,
    onclick,
    borderRadius = '12px',
    bgColor = '#6979F2',
    textColor = 'white',
    icon,
    widthBt,
    borderBt,
    heightBt,
    disabled = false,
  } = props;
  return (
    <div className={`${className}`}>
      <Button
        htmlType={typeBt}
        loading={isLoading}
        className={`border-0 text-white bg-[#bc2449] flex leading-[0] gap-2 items-center justify-center w-full`}
        size={size}
        disabled={disabled}
        onClick={() =>
          isLoading ? {} : typeBt == 'button' && onclick ? onclick() : {}
        }
        style={{
          borderRadius: `${borderRadius}`,
          backgroundColor: `${bgColor}`,
          color: `${textColor}`,
          width: `${widthBt}`,
          border: `${borderBt}`,
          height: `${heightBt}`,
        }}
        icon={icon && icon}>
        {titleBt}
      </Button>
    </div>
  );
};
export default ButtonDefault;

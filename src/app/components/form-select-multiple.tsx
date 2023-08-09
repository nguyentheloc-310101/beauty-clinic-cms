import { Form } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Select, Tag } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
export interface OptionsType {
  value: string;
  label: string;
  disabled?: boolean;
}
interface SelectItemFormProps {
  name: string;
  label?: string;
  required?: boolean;
  message?: string;
  options: OptionsType[];
  placeholder?: string;
  disabled?: boolean;
  size?: SizeType;
  subLabel?: string;
  showSearch?: boolean;
  maxTagPlaceholder?: string;
  onChange?: Function;
}

const FormSelectMultiple = ({
  name,
  label,
  required = false,
  message,
  options,
  placeholder,
  disabled,
  subLabel,
  onChange = () => { },
  showSearch = false,
  maxTagPlaceholder,
}: SelectItemFormProps) => {
  const style = {
    alignLabel: "flex items-end mb-[-8px]",
    label:
      "w-[100%] mb-0 not-italic font-normal text-sm leading-5 text-gray-900 relative ",
    subLabel: "text-xs text-[#B9BDC1] ml-1",
    inputBox:
      "w-[100%] mt-[-8px] not-italic font-normal text-base tracking-[0.5px] text-[#36383A] rounded-lg border-solid border-1px border-[#B9BDC1]",
    icon: { color: "#36383A", fontSize: 20 },
  };
  const tagRender = (props: CustomTagProps) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      JSON.stringify(options).includes(value) && (
        <Tag
          // color={'#F8DDE4'}
          style={{ color: "#BC2449", backgroundColor: "#F8DDE4" }}
          onMouseDown={onPreventMouseDown}
          closable={closable}
          onClose={onClose}
        >
          {label}
        </Tag>
      )
    );
  };
  const handleChange = async (value: any) => {
    onChange(value);
  };

  return (
    <Form.Item
      name={name}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      className="w-[100%] mb-0 not-italic font-normal text-sm leading-5 text-gray-900 relative"
      // style={readOnly ? { pointerEvents: 'none' } : {}}
      label={
        label && (
          <div className="flex items-end mb-[8px]">
            <span className="d-block text-[#36383A] lg:text-[16px] font-[400]">
              {label}
            </span>
            <span className={style.subLabel}>{subLabel}</span>
          </div>
        )
      }
      rules={[
        {
          required: required ? true : false,
          message: message,
        },
      ]}
    >
      <Select
        placeholder={placeholder}
        tagRender={tagRender as any}
        mode="multiple"
        size={"large"}
        className='"w-[100%] mt-[-8px] not-italic font-normal text-base tracking-[0.5px] text-[#36383A] rounded-lg border-solid border-1px  focus:border-white'
        options={options}
        maxTagCount="responsive"
        style={{ width: "100%" }}
        showSearch={showSearch}
        maxTagPlaceholder={(value) => (
          <Tag color="#BC2449">
            +{value.length} {maxTagPlaceholder}
          </Tag>
        )}
        onChange={handleChange}
        disabled={disabled}
        suffixIcon={<ChevronDownIcon width={15} height={15} />}
        filterOption={(input, option) => {
          return (
            option?.label.toLowerCase().includes(input.toLocaleLowerCase()) ??
            false
          );
        }}
      ></Select>
    </Form.Item>
  );
};

export default FormSelectMultiple;

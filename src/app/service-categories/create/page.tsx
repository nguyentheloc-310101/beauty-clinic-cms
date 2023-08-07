'use client';
import { IServiceCategory } from '@/common/types';
import { Button, Form, Input, Tooltip, message } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import querystring from 'query-string';
import { supabase } from '@/services';
import slugify from 'slugify';

export default function Create() {
  const { data, isEdited = false } = querystring.parse(
    useSearchParams().toString()
  );

  let initialServiceCategory = {} as IServiceCategory;
  try {
    initialServiceCategory = JSON.parse(data as string) as IServiceCategory;
  } catch (error) {
    console.log(error);
  }

  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (serviceCategory: IServiceCategory) => {
    messageApi.open({
      type: 'loading',
      content: 'Đang ' + (isEdited ? 'lưu thay đổi...' : 'thêm mới...'),
    });
    if (isEdited)
      await supabase
        .from('service-categories')
        .delete()
        .eq('slug', initialServiceCategory.slug);

    await supabase.from('service-categories').insert({
      name: serviceCategory.name,
      slug: slugify(serviceCategory.name),
    });
    message.success('Thành công!');
    messageApi.destroy();
    router.push('/service-categories');
  };
  return (
    <>
      {contextHolder}
      <header className="flex p-2 gap-4">
        <Tooltip title="Trở về">
          <Button
            shape="circle"
            type="text"
            icon={<LeftOutlined />}
            onClick={router.back}
          />
        </Tooltip>
        <h2>
          {isEdited
            ? 'Chỉnh sửa thông tin bác sĩ'
            : 'Thêm mới thông tin bác sĩ'}
        </h2>
      </header>
      <Form
        labelCol={{ span: 6 }}
        //wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={initialServiceCategory}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}>
        <Form.Item
          label="Tên danh mục"
          name="name">
          <Input />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="block ml-auto">
          {isEdited ? 'Lưu thay đổi' : 'Tạo mới'}
        </Button>
      </Form>
    </>
  );
}

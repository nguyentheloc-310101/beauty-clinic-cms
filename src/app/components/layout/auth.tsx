"use client";
import { useUserStore } from "@/common/store";
import { supabase } from "@/services";
import { Button, Card, Form, Input, message } from "antd";
import React from "react";

const Auth = () => {
  const signIn = useUserStore((state) => state.signIn);

  const onSubmit = async (value: { email: string; password: string }) => {
    const { email, password } = value;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) message.warning(error.message);
    else signIn();
  };
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 backdrop-blur-sm flex items-center justify-center bg-black bg-opacity-10">
      <Card title="Đăng nhập" className="w-[300px]" bordered={false}>
        <Form
          layout="vertical"
          onFinish={onSubmit}
          className="flex flex-col gap-3"
        >
          <Form.Item name="email" label="Nhập email:">
            <Input type="email" />
          </Form.Item>
          <Form.Item name="password" label="Nhập mật khẩu:">
            <Input.Password type="password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="ml-auto block">
            Tiếp tục
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Auth;

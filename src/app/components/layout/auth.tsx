"use client";
import { useUserStore } from "@/common/store";
import { supabase } from "@/services";
import { Button, Card, Form, Input, message } from "antd";
import React from "react";

const Auth = () => {
  const signIn = useUserStore((state) => state.signIn);

  const onSubmit = async (value: { password: string }) => {
    const { data: isSignedIn, error } = await supabase.rpc("check_password", {
      password: value.password,
    });

    if (error) {
      console.error(error);
      return;
    }
    if (!isSignedIn) signIn();
    else message.warning("Sai mật khẩu");
  };
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 backdrop-blur-sm flex items-center justify-center bg-black bg-opacity-10">
      <Card title="Đăng nhập" className="w-[300px]" bordered={false}>
        <Form layout="vertical" onFinish={onSubmit}>
          {/* <Form.Item
            name="phone"
            label="Nhập mật số điện thoại:">
            <Input />
          </Form.Item> */}
          <Form.Item name="password" label="Nhập mật khẩu:">
            <Input.Password />
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

"use client";
import { supabase } from "@/services";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

export default function SignUp({ }: Props) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const asyncFunc = async () => {
      await supabase.auth.signUp({
        email: searchParams.get("email") ?? "admin@mail.com",
        password: searchParams.get("password") ?? "ToiLaAdminAura",
        options: {
          data: {
            userName: searchParams.get("userName") ?? "Quản lý Aura",
          },
        },
      });
    };
    asyncFunc();
  }, []);
  return <></>;
}

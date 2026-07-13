"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { useGetMeQuery } from "@/features/auth/authApi";

export default function RootPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const {data: userInfo, isLoading: loadingUserInfo} = useGetMeQuery();

  useEffect(() => {
    if(user && !loadingUserInfo){
      router.replace("/feed");
    }else{
      router.replace("/login");
    }
  }, [user, router]);

  return null;
}

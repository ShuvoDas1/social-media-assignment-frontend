"use client";

import { useEffect } from "react";
import { useGetMeQuery } from "@/features/auth/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setUser, resetUser } from "@/features/auth/authSlice";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const { data, isSuccess, isError, error } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }

    if (isError) {
      console.log(error);
      localStorage.removeItem("access_token");
      dispatch(resetUser());
    }
  }, [isSuccess, isError, data, dispatch]);

  return children;
}

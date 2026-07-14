"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { useGetMeQuery } from "@/features/auth/authApi";
import moment from "moment";
import { setUser } from "@/features/auth/authSlice";

export default function RootPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: userInfo, isLoading: loadingUserInfo } = useGetMeQuery();

  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: "1s",
      ss: "%ds",
      m: "1m",
      mm: "%dm",
      h: "1h",
      hh: "%dh",
      d: "1d",
      dd: "%dd",
      w: "1w",
      ww: "%dw",
      M: "1mo",
      MM: "%dmo",
      y: "1y",
      yy: "%dy",
    },
  });

  useEffect(() => {
    if (userInfo && !loadingUserInfo) {
      dispatch(setUser(userInfo));
      router.replace("/feed");
    } else {
      router.replace("/login");
    }
  }, [userInfo, loadingUserInfo, router, dispatch]);

  return null;
}

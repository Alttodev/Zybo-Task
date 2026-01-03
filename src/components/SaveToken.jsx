"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SaveToken() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      localStorage.setItem("accessToken", session.accessToken);
    }
  }, [session]);

  return null;
}

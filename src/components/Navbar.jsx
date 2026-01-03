"use client";
import { toastSuccess } from "@/lib/toast";
import { useOrderStore } from "@/lib/Zustand";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  const { data: session, status } = useSession();
  const resetOrder = useOrderStore((state) => state.resetOrder);

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    resetOrder();
    toastSuccess("Logout successfully");
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <nav className="h-17.5 flex items-center bg-white/12  justify-center">
      <div className="m-auto w-[90vw] max-w-360">
        <div className="flex justify-between items-center gap-2 text-gray-400 text-sm h-full">
          <Link href="/home" className="cursor-pointer">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={55}
              height={29}
              priority
            />
          </Link>
          {status === "authenticated" && session?.accessToken && (
            <div className="flex gap-8">
              <Link href="/orders">
                {" "}
                <span className="text-[15px] text-white font-semibold cursor-pointer">
                  My Orders
                </span>
              </Link>

              <div className="text-white flex gap-4">
                {" "}
                <Image
                  src="/assets/profile.png"
                  alt="Profile Logo"
                  width={20}
                  height={20}
                  priority
                />
                <span
                  className="text-[15px] font-semibold cursor-pointer"
                  onClick={handleLogout}
                >
                  Log Out
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

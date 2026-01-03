"use client";
import OrderedCard from "@/components/OrderedProduct";
import { formatDateTime } from "@/lib/helpers";
import { useOrderStore } from "@/lib/Zustand";
import Image from "next/image";
import React from "react";

export default function SuccessPage() {
  const orderResponse = useOrderStore((state) => state.orderResponse);
  return (
    <section className="bg-white/10">
      <div className="flex flex-col space-y-6 items-center justify-center min-h-screen w-full">
        <Image
          src="/assets/logo.png"
          alt="Logo"
          width={107}
          height={56}
          priority
        />
        <div className="flex flex-col w-full max-w-130 text-center gap-6">
          <h1 className="text-white text-[36px] font-bold">
            Successfully Ordered!
          </h1>
          <h3 className="text-gray-400  text-[14px] leading-tight">
            {formatDateTime(orderResponse?.order?.created)}
          </h3>
          <OrderedCard orderResponse={orderResponse} />
        </div>
      </div>
    </section>
  );
}

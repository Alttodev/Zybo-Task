import React from "react";
import { getListData } from "../api/auth/[...nextauth]/server";
import ProductGrid from "@/components/CardProduct";

export default async function Home() {
  const products = await getListData();
  return (
    <section className="bg-white/10 pb-14">
      <div className="m-auto  min-h-screen  w-[90vw] max-w-360  ">
        <h1 className="text-white text-[40px] font-semibold pt-16 ">
          Men&apos;s Jordan Shoes
        </h1>
        <div className="mt-8">
          <ProductGrid product={products} />
        </div>
      </div>
    </section>
  );
}

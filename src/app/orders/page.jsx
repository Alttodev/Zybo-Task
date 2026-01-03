import React from "react";

import OrdersCard from "@/components/Orders";
import { getOrderData } from "../api/auth/[...nextauth]/server";

export default async function Orders() {
  const orders = await getOrderData();
  return (
    <section className="bg-white/10 pb-14">
      <div className="m-auto  min-h-screen  w-[85vw] max-w-360 ">
        <div className="w-full max-w-202">
          <h1 className="text-white text-[40px] font-semibold pt-16">
            My Orders
          </h1>
          <div className="mt-8">
            <OrdersCard orders={orders} />
          </div>
        </div>
      </div>
    </section>
  );
}

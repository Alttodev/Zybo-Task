import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function OrdersCard({ orders }) {
  const orderList = orders?.orders || [];

  if (orderList.length === 0) {
    return <div className="text-center text-white py-10">No orders yet</div>;
  }
  return (
    <>
      {orderList.map((item, index) => (
        <Card
          key={item?.order_id || index}
          className="bg-[#FFFFFF14] border-none rounded-2xl p-4 mb-6 w-full"
        >
          <CardContent className="flex flex-col sm:flex-row justify-between p-0 gap-4">
            {/* Left: Image + Info */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-1">
              {/* Image */}
              <div className="rounded-xl overflow-hidden flex shrink-0 w-full sm:w-27 h-17">
                <Image
                  src={item?.product_image || "/assets/sample.png"}
                  alt={item?.product_name}
                  width={110}
                  height={70}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col items-start gap-1 sm:gap-2 h-full">
                <h3 className="text-white font-semibold text-base leading-tight">
                  {item?.product_name}
                </h3>
                <p className="text-sm text-gray-400">{item?.order_id}</p>
                <p className="text-gray-400 text-[13px]">{item?.created_date}</p>
              </div>
            </div>

            {/* Right: Price */}
            <div className="flex flex-row sm:flex-col gap-2 text-right items-end sm:items-start">
              <p className="text-white text-sm font-semibold">
                ₹{Number(item?.product_price).toLocaleString("en-IN")}
              </p>
              <p className="text-[#FFFFFF99] text-xs line-through">
                ₹{Number(item?.product_mrp).toLocaleString("en-IN")}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

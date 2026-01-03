import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function OrderedCard({ orderResponse }) {
  return (
    <>
      {orderResponse?.order?.order_details?.map((item, index) => (
        <Card
          key={item?.order_id || index}
          className="bg-[#FFFFFF14] border-none  rounded-2xl p-4 mb-6 w-full"
        >
          <CardContent className="flex justify-between p-0">
            <div className="flex align-center gap-6">
              <div className="rounded-xl overflow-hidden flex shrink-0">
                <Image
                  src={item?.product_image}
                  alt={item?.product_name}
                  width={110}
                  height={70}
                  className="object-fill h-25"
                />
              </div>

              <div className="flex flex-col justify-center items-start gap-1 h-full">
                <h3 className="text-white font-semibold text-base leading-tight">
                  {item?.product_name}
                </h3>

                <p className="text-sm text-gray-400">
                  {orderResponse?.order?.id}
                </p>

                <p className="text-gray-400 text-[13px]">
                  {orderResponse?.order?.payment_status}
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-2 items-center text-right">
              <p className="text-white text-sm font-semibold">
                ₹{Number(item?.without_tax_amount).toLocaleString("en-IN")}
              </p>
              <p className="text-[#FFFFFF99] text-xs pt-1 line-through">
                ₹{Number(item?.amount).toLocaleString("en-IN")}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

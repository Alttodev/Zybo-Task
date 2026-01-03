"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { purchaseProduct } from "@/app/api/auth/[...nextauth]/server";
import { toastError, toastSuccess } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/lib/Zustand";

function CardProduct({ product }) {
  const bgRef = useRef(null);
  const footerRef = useRef(null);
  const sizeRef = useRef(null);
  const colorRef = useRef(null);
  const buttonRef = useRef(null);
  const router = useRouter();
  const setOrderResponse = useOrderStore((state) => state.setOrderResponse);
  const [isBuying, setIsBuying] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState(null);
  const [selectedColor, setSelectedColor] = useState(
    product.variation_colors[0]?.color_name || null
  );

  const [displayImages, setDisplayImages] = useState(
    product.product_images.map((img) => img.product_image)
  );

  const toggleSize = (size) => {
    setSelectedSizes(size);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color.color_name);
    setDisplayImages(color.color_images);
  };

  const handleHover = () => {
    gsap.to(bgRef.current, { y: -95, duration: 0.6, ease: "power3.out" });
    gsap.to(footerRef.current, { y: 0, duration: 0.5, ease: "power3.out" });

    gsap.to(sizeRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: 0.1,
    });

    gsap.to(colorRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: 0.25,
    });

    gsap.to(buttonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: 0.4,
    });
  };

  const handleLeave = () => {
    gsap.to(bgRef.current, { y: 0, duration: 0.6, ease: "power3.out" });
    gsap.to(footerRef.current, {
      y: "100%",
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to([sizeRef.current, colorRef.current, buttonRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.2,
    });
  };

  const handleBuyNow = async () => {
    if (isBuying) return;

    if (!selectedSizes) {
      toastError("Please select a size!");
      return;
    }

    try {
      setIsBuying(true);
      const payload = {
        variation_product_id: selectedSizes.variation_product_id,
      };

      const res = await purchaseProduct(payload);
      setOrderResponse(res);
      router.push(`/success/${product.id}`);
      toastSuccess(res?.message);
    } catch (error) {
      toastError(error?.response?.data?.error);
    } finally {
      setIsBuying(false);
    }
  };

  useEffect(() => {
    gsap.set([sizeRef.current, colorRef.current, buttonRef.current], {
      opacity: 0,
      y: 20,
    });
  }, []);

  return (
    <Card
      className="relative w-full max-w-[320px] h-104 mx-auto overflow-hidden shadow-2xl border-0 p-0 mb-6 bg-[#232323] rounded-none"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <CardContent className="relative h-full p-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 z-0">
          <Image
            src={displayImages[0] || "/assets/sample.png"}
            alt={product.name || "Product Image"}
            fill
            className="object-cover"
          />
        </div>
      </CardContent>

      <CardFooter
        ref={footerRef}
        className="absolute bottom-0 left-0 right-0 bg-[#232323] p-6 flex-col z-10"
        style={{ height: "168px", transform: "translateY(100%)" }}
      >
        {/* Sizes */}
        <div
          ref={sizeRef}
          className="flex items-center justify-center gap-1 mb-3"
        >
          <span className="text-white text-[16px] font-semibold mr-4">
            SIZE:
          </span>
          {selectedColor &&
            product.variation_colors
              .find((c) => c.color_name === selectedColor)
              ?.sizes.map((s) => (
                <button
                  key={s.size_id}
                  onClick={() => toggleSize(s)}
                  className={`w-8 h-8 text-sm font-bold rounded cursor-pointer transition-all ${
                    selectedSizes?.size_id === s.size_id
                      ? "bg-[#372224] text-white hover:bg-gray-700"
                      : "bg-white text-black"
                  }`}
                >
                  {s.size_name}
                </button>
              ))}
        </div>

        {/* Colors */}
        <div
          ref={colorRef}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <span className="text-white text-[16px] font-semibold mr-2">
            COLOR:
          </span>
          {product.variation_colors.map((c) => (
            <button
              key={c.color_id}
              onClick={() => handleColorSelect(c)}
              className={`relative w-4 h-4 rounded-full cursor-pointer flex items-center justify-center ${
                selectedColor === c.color_name ? "ring-1 ring-white" : ""
              }`}
            >
              <span
                className="w-4 h-4 rounded-full border border-gray-600"
                style={{ backgroundColor: c.color_name.toLowerCase() }}
              />
            </button>
          ))}
        </div>

        {/* Buy Button */}
        <div ref={buttonRef} className="flex justify-center">
          <button
            className="bg-white text-black w-29 h-11 rounded-[5px] font-semibold text-[16px] cursor-pointer"
            onClick={handleBuyNow}
          >
            {isBuying ? "Loading..." : "Buy Now"}
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function ProductGrid({ product }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {product.map((product) => (
        <CardProduct key={product.id} product={product} />
      ))}
    </div>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import ButtonWidget from "../widgets/ButtonWidget";
import OtpInput from "../forminputs/OtpInput";
import FormWidget from "../widgets/FormWidget";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/lib/Zustand";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "@/lib/validation";
import { toastError } from "@/lib/toast";

export default function OtpStep({ onSuccess, onNewUser, resendOtp }) {
  const { phone, isExistingUser, otp } = useAuthStore();
  const clearAuthData = useAuthStore((s) => s.clearAuthData);

  const [timer, setTimer] = useState(60);
  const hasCalledRef = useRef(false);
  const increment = useRef(null);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const onSubmit = async ({ otp }) => {
    const res = await signIn("credentials", {
      phone,
      otp,
      redirect: false,
    });

    if (!res?.ok) {
      toastError("Invalid OTP");
      return;
    }

    isExistingUser ? onSuccess() : onNewUser();
  };

  const handleEditPhone = () => {
    clearAuthData();
    resendOtp();
  };

  useEffect(() => {
    increment.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(increment.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(increment.current);
  }, []);

  useEffect(() => {
    if (timer === 0 && !hasCalledRef.current) {
      hasCalledRef.current = true;
      resendOtp();
    }
  }, [timer, resendOtp]);

  useEffect(() => {
    if (otp) {
      setValue("otp", otp);
    }
  }, [otp, setValue]);

  return (
    <FormWidget onSubmit={handleSubmit(onSubmit)} className="space-y-9">
      <div className="mb-14 space-y-4">
        <h1 className="text-[20px] md:text-[28px] font-medium text-white text-center">
          Verify Phone
        </h1>

        <div className="text-[15px] text-[#FFFFFF] text-center">
          Enter the OTP sent to{" "}
          <span className="inline-flex items-center gap-3">
            {phone}

            <button
              type="button"
              onClick={handleEditPhone}
              className="p-1 rounded focus:outline-none cursor-pointer"
              aria-label="Edit phone number"
            >
              <Image
                src="/assets/edit.png"
                alt="Edit Phone"
                width={16}
                height={16}
                priority
              />
            </button>
          </span>
        </div>
      </div>

      <div>
        <label className="block text-white text-[16px] mb-3">Enter OTP </label>

        <OtpInput name="otp" control={control} maxLength={4} />

        {errors.otp?.message && (
          <p className="text-white text-sm mt-2">{errors.otp?.message}</p>
        )}

        <div className="block text-[#FFFFFF99] text-[15px] mt-4">
          {timer !== 0 && (
            <>
              Resend OTP in{" "}
              <span className="text-white text-[16px]">{timer}s</span>
            </>
          )}
        </div>
      </div>

      <ButtonWidget
        type="submit"
        disabled={isSubmitting}
        className="w-full max-w-150 h-14  bg-white text-black cursor-pointer font-semibold py-3 rounded-lg hover:bg-white disabled:opacity-50"
      >
        {isSubmitting ? (
          "Verifying..."
        ) : (
          <span className="text-[16px]">Verify</span>
        )}
      </ButtonWidget>
    </FormWidget>
  );
}

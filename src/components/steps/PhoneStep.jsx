"use client";
import { loginSchema } from "@/lib/validation";
import TextInput from "../forminputs/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ButtonWidget from "../widgets/ButtonWidget";
import FormWidget from "../widgets/FormWidget";
import { toastError, toastSuccess } from "@/lib/toast";
import axios from "axios";
import { useAuthStore } from "@/lib/Zustand";

export default function PhoneStep({ onSuccess }) {
  const setAuthData = useAuthStore((s) => s.setAuthData);
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async ({ phone }) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/verify/`,
        {
          phone_number: phone,
        }
      );

      onSuccess({
        phone,
        isExistingUser: data.user,
      });
      setAuthData({
        phone,
        isExistingUser: data.user,
        otp: data.otp,
      });
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <FormWidget onSubmit={handleSubmit(onSubmit)} className="space-y-9">
      <h1 className="text-[20px] md:text-[28px] font-medium text-white text-center mb-14">
        Log In
      </h1>
      <div>
        <label className="block text-white text-[16px] mb-3">Phone</label>

        <TextInput
          name="phone"
          control={control}
          placeholder="Enter Phone"
          disabled={isSubmitting}
        />
        {errors.phone?.message && (
          <p className="text-white text-sm mt-2">{errors.phone?.message}</p>
        )}
      </div>

      <ButtonWidget
        type="submit"
        disabled={isSubmitting}
        className="w-full max-w-150 h-14  bg-white text-black cursor-pointer font-semibold py-3 rounded-lg hover:bg-white disabled:opacity-50"
      >
        {isSubmitting ? (
          "Loading..."
        ) : (
          <span className="text-[16px]">Continue</span>
        )}
      </ButtonWidget>
    </FormWidget>
  );
}

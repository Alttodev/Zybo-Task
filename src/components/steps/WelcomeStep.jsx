"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import ButtonWidget from "../widgets/ButtonWidget";
import FormWidget from "../widgets/FormWidget";
import TextInput from "../forminputs/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validation";

export default function WelcomeStep({ phone, onSuccess }) {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async ({ name }) => {
    const res = await signIn("credentials", {
      phone,
      name,
      isRegister: true,
      redirect: true,
      callbackUrl: "/home",
    });
    if (res?.error) {
      toastError(res.error);
    } else {
    toastSuccess(res?.user?.message || "Login Successful");
    }
  };

  return (
    <FormWidget onSubmit={handleSubmit(onSubmit)} className="space-y-9">
      <h1 className="text-[20px] md:text-[28px] font-medium text-white text-center mb-14">
        Welcome,You are?
      </h1>
      <div>
        <label className="block text-white text-[16px] mb-3">Name</label>
        <TextInput
          name="name"
          control={control}
          placeholder="Eg: John Mathew"
          disabled={isSubmitting}
        />
        {errors.name?.message && (
          <p className="text-white text-sm mt-2">{errors.name?.message}</p>
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

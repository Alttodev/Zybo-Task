import { z } from "zod";

export const loginSchema = z.object({
  phone: z
    .string()
    .nonempty({ message: "Phone is required" })
    .regex(/^\d+$/, { message: "Phone must contain only numbers" })
    .refine(
      (val) => {
        let digits = val.replace(/\D/g, "");
        if (digits.startsWith("91")) digits = digits.slice(2);
        return digits.length === 10;
      },
      {
        message: "Phone must be exactly 10 digits",
      }
    ),
});

export const registerSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .nonempty({ message: "OTP is required" })
    .regex(/^\d+$/, { message: "OTP must contain only numbers" })
    .length(4, { message: "OTP must be 4 digits" }),
});

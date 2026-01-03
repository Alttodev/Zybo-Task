import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Controller } from "react-hook-form";

function OtpInput({ name, control, disabled }) {
  if (!control) return null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <InputOTP
          {...field}
          value={field.value ?? ""}
          maxLength={4}
          disabled={disabled}
        >
          <InputOTPGroup className="flex justify-between w-full max-w-150 mx-auto gap-4">
            {[0, 1, 2, 3].map((index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="
                
  flex-1
  text-2xl
  w-full
  h-22
  bg-white/10
  text-white
  rounded-lg
  shadow-none
  border-none
  caret-white
  
   
  
"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      )}
    />
  );
}

export default OtpInput;

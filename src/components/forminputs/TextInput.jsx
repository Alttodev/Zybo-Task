import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

function TextInput({ name, control, placeholder, type, disabled }) {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder={placeholder}
            className="w-full max-w-150 h-14 bg-white/10 text-white placeholder-gray-600 rounded-lg px-4 py-3  shadow-none  border-none focus:outline-none focus:ring-0  "
            type={type}
            disabled={disabled}
          />
        )}
      />
    </div>
  );
}

export default TextInput;

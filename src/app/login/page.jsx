"use client";

import { useState } from "react";

import PhoneStep from "@/components/steps/PhoneStep";
import OtpStep from "@/components/steps/OtpStep";
import WelcomeStep from "@/components/steps/WelcomeStep";
import LoginLayout from "@/components/layouts/LoginLayout";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router=useRouter()
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [isExistingUser, setIsExistingUser] = useState(false);

  return (
    <>
      <LoginLayout>
        {step === "phone" && (
          <PhoneStep
            onSuccess={({ phone, isExistingUser }) => {
              setPhone(phone);
              setIsExistingUser(isExistingUser);
              setStep("otp");
            }}
          />
        )}

        {step === "otp" && (
          <OtpStep
            phone={phone}
            isExistingUser={isExistingUser}
            onSuccess={() => router.push("/home")}
            onNewUser={() => setStep("welcome")}
            resendOtp={() => setStep("phone")}
          />
        )}

        {step === "welcome" && (
          <WelcomeStep
            phone={phone}
          />
        )}
      </LoginLayout>
    </>
  );
}

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create((set) => ({
  phone: "",
  isExistingUser: false,
  otp: "",

  setAuthData: (data) =>
    set({
      phone: data.phone ?? "",
      isExistingUser: data.isExistingUser ?? false,
      otp: data.otp ?? "",
    }),

  clearAuthData: () =>
    set({
      phone: "",
      isExistingUser: false,
      otp: "",
    }),
}));

export const useOrderStore = create(
  persist(
    (set) => ({
      orderResponse: null,

      setOrderResponse: (response) => set({ orderResponse: response }),

      resetOrder: () => set({ orderResponse: null }),
    }),
    {
      name: "order-store",
    }
  )
);

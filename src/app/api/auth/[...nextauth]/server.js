import clientAxios, { createServerAxios } from "@/lib/axios";

export const getListData = async () => {
  const axiosInstance = await createServerAxios(); 
  const response = await axiosInstance.get("/api/new-products/");
  return response.data;
};

export const getOrderData = async () => {
  const axiosInstance = await createServerAxios(); 
  const response = await axiosInstance.get("/api/user-orders/");
  return response.data;
};



export const purchaseProduct = async (payload) => {
  const response = await clientAxios.post(
    "/api/purchase-product/",
    payload
  );
  return response.data;
};


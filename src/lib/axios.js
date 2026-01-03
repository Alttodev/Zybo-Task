import { authOptions } from "../app/api/auth/[...nextauth]/route";
import axios from "axios";
import { getServerSession } from "next-auth";


const serverBaseURL = process.env.API_URL;
const clientBaseURL = process.env.NEXT_PUBLIC_API_URL;

export const createServerAxios = async () => {
  const session = await getServerSession(authOptions);
  return axios.create({
    baseURL: serverBaseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: session?.accessToken ? `Bearer ${session.accessToken}` : "",
    },
  });
};

export const clientAxios = axios.create({
  baseURL: clientBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

clientAxios.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default clientAxios;



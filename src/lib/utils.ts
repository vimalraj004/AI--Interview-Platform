import axios, { AxiosError } from "axios";
import { RegisterDTOResponse } from "@/app/types/signUpPage";
import { loginrFormResponse } from "@/app/types/loginPage";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const loginAndRegisterService = async (
  endpoint: string,
  type: string,
  payload: object,
): Promise<RegisterDTOResponse | loginrFormResponse> => {
  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
      method: type,
      data: payload,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || "Request failed",
        status: error.response?.status,
      };
    }
    throw { message: "Something went Wrong" };
  }
};

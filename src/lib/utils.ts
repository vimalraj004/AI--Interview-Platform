import axios, { AxiosError } from "axios";
import { RegisterDTOResponse } from "@/app/types/signUpPage";
import { loginrFormResponse } from "@/app/types/loginPage";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const commonService = async <TResponse> (
  endpoint: string,
  type: string,
  payload?: object,
  isFormData: boolean = false
): Promise<TResponse> => {
  try {
    const response = await axios({
      url: `${endpoint}`,
      method: type,
      data: payload,
      headers: isFormData
        ? {} // for file transfers
        : { "Content-Type": "application/json" },
      withCredentials:true
    });
    return{
      ...response.data,
      status:response.status
    }  as TResponse;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || "Request Failed",
        status: error.response?.status,
      };
    }
    throw { message: "Something went Wrong" };
  }
};


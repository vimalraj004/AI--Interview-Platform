import axios, { AxiosResponse } from "axios";
import { promises } from "dns";
import {RegisterDTOResponse} from "@/app/types/signUpPage"

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const loginAndRegisterService = async (endpoint: string,type: string,payload: object):Promise<RegisterDTOResponse> => {
  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
      method: type,
      data: payload,
      headers: { "Content-Type": "application/json" },
    });
    return response.data
  } catch (error:any) {
    console.log(error);
    throw error; 
  }
};


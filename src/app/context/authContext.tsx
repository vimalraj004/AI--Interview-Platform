"use client";
import { commonService } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
interface userData {
  _id: string;
  name: string;
  email: string;
}
type authContextType = {
  userData: userData | null;
  setUserData: React.Dispatch<React.SetStateAction<userData | null>>;
};
type authmeDTOResponse ={
    message:string,
    userData:userData
    status:number
}
const authContext = createContext<authContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

  const initialUserData: userData = {
    _id: "",
    name: "",
    email: "",
  };
  const [userData, setUserData] = useState<userData | null>(initialUserData);
  const getUserData = async()=>{
    try {
    const result = await commonService<authmeDTOResponse>("/api/authme","GET")
    setUserData(result.userData)
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(()=>{
    if(pathname.startsWith("/dashboard")){
        getUserData()
    }
  },[pathname])
  return (
    <authContext.Provider value={{ userData, setUserData }}>
      {children}
    </authContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("AuthContext need to created ");
  }
  return context
};

import Image from "next/image";
import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ToastContainer,toast } from "react-toastify";
import { commonService } from "@/lib/utils";
import { logoutResponse } from "@/app/types/logoutPage";
import { useRouter } from "next/navigation";

const LogoutContainer = () => {
    const navigate = useRouter();
    const logout= async()=>{
        try {
            const result = await commonService<logoutResponse>("/api/logout","post")
            if(result.status === 200){
                toast.success(result.message)
                navigate.push("/")
            }
            
        } catch (error:any) {
            toast.error(error.message);
            console.log(error)
        }
    }
  return (
<AlertDialog>
  <AlertDialogTrigger asChild>
    <div className="flex justify-center items-center mt-2 md:mt-0 cursor-pointer">
      <div className="h-9 w-9 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
        <Image
          src="/codie_transparent.bdfb741fb8a3211d12e3.png"
          height={32}
          width={32}
          className="rounded-full"
          alt="USER"
        />
      </div>
    </div>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        You Want To Logout
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>logout()}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default LogoutContainer


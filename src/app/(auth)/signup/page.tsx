"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"

const SignUp = () => {
const [showeye, setShoweye] = useState(false)

  return (
    <div className="flex  w-full  px-2 ">
      <Card className="w-full max-w-md backdrop-blur-md h-full  shadow-xl  ">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-xl md:text-2xl">
            Signup
          </CardTitle>
          <CardDescription>
              Sign up to unlock AI-powered interview practice
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
            <Input
              type="email"
              placeholder="Example@gmail.com"
              required
            />

            <div className="relative">
              <Input
                type={showeye ? "text" : "password"}
                placeholder="••••••••"
                required
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShoweye(!showeye)}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 cursor-pointer "
              >
                {showeye ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            <Button variant="outline" className="w-full">
              Google Signup
            </Button>
            <Button className="w-full">
              Signup
            </Button>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 text-sm text-blue-500">
              <Link href={"/login"} >Already have an account?</Link>
              {/* <Link href={"/forgetpassword"} >Forget Password ?</Link> */}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUp
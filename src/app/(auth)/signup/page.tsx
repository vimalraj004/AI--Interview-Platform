"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { RegisterDTOResponse, RegisterForm, RegisterFormError } from "@/app/types/signUpPage";
import { registerSchema } from "@/app/validators/loginAndRegvalidation";
import { commonService } from "@/lib/utils";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Audio } from "react-loader-spinner";
import { useLoading } from "@/app/context/loadingContext";
const SignUp = () => {
  const [showeye, setShoweye] = useState(false);
  const { loading, setLoading } = useLoading();
  const initialUserAccount = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [useraccount, setUserAccount] =
    useState<RegisterForm>(initialUserAccount);
  const [errors, setErrors] = useState<RegisterFormError>({});
  let navigate = useRouter();
  const setOnInputChnage = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof RegisterForm,
  ): void => {
    const value = e.target.value;
    setUserAccount((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [fieldName]: undefined,
    }));
  };
  const signUp = async (useraccount: RegisterForm): Promise<void> => {
    try {
      setLoading(true);
      const result = registerSchema.safeParse(useraccount);
      if (!result.success) {
        const fieldError = result.error.flatten().fieldErrors;
        setErrors({
          email: fieldError?.email?.[0],
          password: fieldError?.password?.[0],
          confirmPassword: fieldError?.confirmPassword?.[0],
        });
        return;
      }
      let payload = {
        email: result.data?.email,
        password: result.data?.password,
        confirmPassword: result.data?.confirmPassword,
      };
      const response = await commonService<RegisterDTOResponse>(
        `/api/signup`,
        "POST",
        payload,
      );
      toast.success(response.message);
      setTimeout(() => {
        navigate.push("/dashboard");
      }, 500);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  w-full  px-2 ">
      <Card className="w-full max-w-md backdrop-blur-md h-full  shadow-xl  ">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-xl md:text-2xl">Signup</CardTitle>
          <CardDescription>
            Sign up to unlock AI-powered interview practice
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              signUp(useraccount);
            }}
          >
            <Input
              type="email"
              placeholder="Example@gmail.com"
              onChange={(e) => {
                setOnInputChnage(e, "email");
              }}
            />
            {errors && errors.email && (
              <p className="text-red-500 text-xs sm:text-sm md:text-sm lg:text-sm leading-snug mt-1">
                {errors.email}
              </p>
            )}

            <div className="relative">
              <Input
                type={showeye ? "text" : "password"}
                placeholder="Password"
                className="pr-10"
                onChange={(e) => {
                  setOnInputChnage(e, "password");
                }}
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
            {errors && errors.password && (
              <p className="text-red-500 text-xs sm:text-sm md:text-sm lg:text-sm leading-snug mt-1">
                {errors.password}
              </p>
            )}
            <div className="relative">
              <Input
                type={showeye ? "text" : "password"}
                placeholder="ConfirmPassword"
                className="pr-10"
                onChange={(e) => {
                  setOnInputChnage(e, "confirmPassword");
                }}
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
            {errors && errors.confirmPassword && (
              <p className="text-red-500 text-xs sm:text-sm md:text-sm lg:text-sm leading-snug mt-1">
                {errors.confirmPassword}
              </p>
            )}
            <Button variant="outline" className="w-full">
              Google Signup
            </Button>
            <Button
              className="w-full"
              type="button"
              onClick={() => signUp(useraccount)}
            >
              {!loading ? (
                "Signup"
              ) : (
                <div className="flex items-center gap-2">
                  <Audio
                    height="30"
                    width="30"
                    color="#4fa94d"
                    ariaLabel="audio-loading"
                    visible={true}
                  />
                  <span className="text-sm text-gray-600">Loading...</span>
                </div>
              )}
            </Button>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 text-sm text-blue-500">
              <Link href={"/login"}>Already have an account?</Link>
              {/* <Link href={"/forgetpassword"} >Forget Password ?</Link> */}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;

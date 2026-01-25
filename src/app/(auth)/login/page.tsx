"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { loginFromError, loginForm } from "@/app/types/loginPage";
import { loginSchema } from "@/app/validators/loginAndRegvalidation";
import { useRouter } from "next/navigation";
import { Audio } from "react-loader-spinner";
import { loginAndRegisterService } from "@/lib/commonFunction";
import { useLoading } from "@/app/context/loadingContext";
const LoginPage = () => {
  const [showeye, setShoweye] = useState(false);
  const initialCredintials = {
    email: "",
    password: "",
  };
  const [userCredentials, setUserCredentials] =
    useState<loginForm>(initialCredintials);
  const [errors, setErrors] = useState<loginFromError>({});
  const { loading, setLoading } = useLoading();

  let navigate = useRouter();
  const setOnInputChnage = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof loginForm,
  ): void => {
    const value = e.target.value;
    setUserCredentials((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [fieldName]: undefined,
    }));
  };

  const login = async (userCredentials: loginForm): Promise<void> => {
    try {
      setLoading(true);
      const result = loginSchema.safeParse(userCredentials);
      if (!result.success) {
        const fieldError = result.error.flatten().fieldErrors;
        setErrors({
          email: fieldError.email?.[0],
          password: fieldError.password?.[0],
        });
        return;
      }
      let payload = {
        email: result?.data?.email,
        password: result?.data?.password,
      };
      const response = await loginAndRegisterService(
        "/api/login",
        "POST",
        payload,
      );
      console.log(response, "response");
      toast.success(response.message);
      setTimeout(() => {
        navigate.push("/dashboard");
      }, 700);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex  w-full  px-2 ">
      <Card className="w-full max-w-md backdrop-blur-md h-full  shadow-xl  ">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-xl md:text-2xl">Login</CardTitle>
          <CardDescription>Enter Email And Password To Login</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              login(userCredentials);
            }}
          >
            <Input
              type="email"
              placeholder="Example@gmail.com"
              onChange={(e) => setOnInputChnage(e, "email")}
            />
            {errors && errors.email && (
              <p className="text-red-500 text-xs sm:text-sm md:text-sm lg:text-sm leading-snug mt-1">
                {errors.email}
              </p>
            )}

            <div className="relative">
              <Input
                type={showeye ? "text" : "password"}
                placeholder="••••••••"
                className="pr-10"
                onChange={(e) => setOnInputChnage(e, "password")}
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
            {errors && errors.email && (
              <p className="text-red-500 text-xs sm:text-sm md:text-sm lg:text-sm leading-snug mt-1">
                {errors.email}
              </p>
            )}
            <Button variant="outline" className="w-full">
              Google Login
            </Button>
            <Button
              className="w-full"
              type="button"
              onClick={() => {
                login(userCredentials);
              }}
            >
              {!loading ? (
                "Login"
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
              <Link href={"/signup"}>New User?</Link>
              <Link href={"/forgetpassword"}>Forget Password ?</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;

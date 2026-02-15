"use client";
import React, { useEffect, useState } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import {
  loginFromError,
  loginForm,
  loginrFormResponse,
} from "@/app/types/loginPage";
import { loginSchema } from "@/app/validators/loginAndRegvalidation";
import { useRouter } from "next/navigation";
import { Audio } from "react-loader-spinner";
import { commonService } from "@/lib/utils";
import { initializeFireBase } from "@/firebase/firebase";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { googleUserData } from "@/app/types/signUpPage";
const LoginPage = () => {
  const googleSignUpProvide = new GoogleAuthProvider();
  const [loginLoading, setLoginLoading] = useState(false);
  const [googleloginLoading, setGoogleLoginLoading] = useState(false);
  const [showeye, setShoweye] = useState(false);
  const initialCredintials = {
    email: "",
    password: "",
  };
  const [userCredentials, setUserCredentials] =
    useState<loginForm>(initialCredintials);
  const [errors, setErrors] = useState<loginFromError>({});

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
      setLoginLoading(true);
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
      const response = await commonService<loginrFormResponse>(
        "/api/login",
        "POST",
        payload,
      );
      toast.success(response.message);
      setTimeout(() => {
        navigate.push("/dashboard");
      }, 700);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoginLoading(false);
    }
  };
  const sendGoogleDatas = async (user: googleUserData) => {
    try {
      let payload = {
        email: user.email,
        googleID: user.uid,
      };
      console.log(payload,"payload")
      const response = await commonService<loginrFormResponse>(
        "/api/login",
        "POST",
        payload,
      );
      if ((response.status = 200)) {
        toast.success(response.message);
        setTimeout(() => {
          navigate.push("/dashboard");
        }, 500);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setGoogleLoginLoading(false);
    }
  };
  const loginWithGoogle = async () => {
    try {
      setGoogleLoginLoading(true);
      const auth = getAuth();
      signInWithPopup(auth, googleSignUpProvide).then((result) => {
        const user = result.user;
        console.log(user, "checkthe user");
        sendGoogleDatas(user);
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };
  useEffect(() => {
    console.log("hei r u calling1");
    initializeFireBase();
  }, []);
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
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => loginWithGoogle()}
            >
              {!googleloginLoading ? (
                <div className="flex gap-1">
                  <FcGoogle size={20} className="mt-1" />
                  <span className="text-sm ">Google Login</span>
                </div>
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
            <Button
              className="w-full"
              type="button"
              onClick={() => {
                login(userCredentials);
              }}
            >
              {!loginLoading ? (
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

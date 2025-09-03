import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAuth } from "@/context/AuthContext";
import Lottie from "lottie-react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import loginImg from "../../../assets/login-anime.json";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// 1. Schema
const loginSchema = z.object({
  email: z.string().min(5, "Email must be at least 5 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormValues = z.infer<typeof loginSchema>;
const LoginLayout: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [rememberMe, setRememberMe] = useState(false);

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });
  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = async (data: AuthFormValues) => {
    setIsLoading(true);
    try {
      await login(data);
      toast.success("user is login succssfully!");
      navigate("/dashboard");
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : "Something went wrong!";
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };
  // const [formData, setFormData] = useState<FormData>({
  //   email: "",
  //   password: "",
  // });

  // const [resetData, setResetData] = useState<ResetData>({
  //   email: "",
  // });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleResetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setResetData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   await login(data).then((res) => {
  //     navigate("/dashboard");
  //   });
  //   // Simulate API call
  //   // await new Promise((resolve) => setTimeout(resolve, 2000));

  //   console.log("Login submitted:", formData);
  //   setIsLoading(false);
  // };

  // const handleResetPassword = async () => {
  //   setIsLoading(true);

  //   // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 2000));

  //   console.log("Reset password for:", resetData.email);
  //   setIsLoading(false);
  // };

  // const goBackToLogin = () => {
  //   setShowResetPassword(false);
  //   setResetData({ email: "" });
  // };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Main Container */}

      <div className="flex gap-6 w-full">
        {/* Right Column - Login Form */}
        <div className="  w-full  lg:w-1/2 flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-xl p-8 border border-white/20">
            <div className=" ">
              <div className="text-center">
                <p className="mt-2 text-gray-600">Sign in to your account</p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="relative">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Mail className=" text-gray-400 w-5 h-5 pointer-events-none" />
                              Email
                            </FormLabel>
                            <FormControl>
                              <input
                                type="email"
                                id="email"
                                className="w-full  p-3 md:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                                placeholder="Enter your email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="relative">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Lock className=" text-gray-400 w-5 h-5 pointer-events-none" />
                              Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  className="w-full  p-3 md:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                                  placeholder="Enter your email"
                                  {...field}
                                />
                                <button
                                  type="button"
                                  onClick={togglePasswordVisibility}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                  {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                  ) : (
                                    <Eye className="w-5 h-5" />
                                  )}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Remember me
                      </span>
                    </label> */}
                    <Link
                      to={"/reset-password"}
                      className="text-sm ms-auto text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      Forgot password ?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    // onClick={handleSubmit}
                    className={`w-full cursor-pointer py-3 px-4 rounded-xl font-medium text-white transition-all transform hover:scale-105 shadow-lg ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>
              </Form>
            </div>
          </div>
        </div>
        {/* Left Column - Branding & Animation */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="bg-muted relative hidden md:flex h-full ">
            <Lottie
              className="flex self-end"
              height="100%"
              animationData={loginImg}
              loop={true}
              autoplay={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;

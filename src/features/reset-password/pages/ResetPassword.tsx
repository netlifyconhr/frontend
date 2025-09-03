import React, { useState } from "react";
import { Mail, Lock, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosInstance from "@/lib/axios-instance";
import type { TResponse } from "@/types";
import { toast } from "sonner";
import { AxiosError } from "axios";

type Step = "email" | "otp" | "password" | "success";

interface EmailFormData {
  email: string;
}
interface OTPFormData {
  otp: string;
}
interface PasswordFormData {
  password: string;
  confirmPassword: string;
}

const PasswordResetFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>("email");
  const [email, setEmail] = useState<string>("");
  const [token, settoken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<EmailFormData>();

  const {
    register: registerOTP,
    handleSubmit: handleOTPSubmit,
    formState: { errors: otpErrors },
  } = useForm<OTPFormData>();

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>();

  const password = watch("password");

  const onSubmitEmail = async (data: EmailFormData) => {
    setIsLoading(true);

    try {
      setEmail(data.email);
      await axiosInstance.post<TResponse<{ otp: string }>>(
        "/auth/forgot-password",
        data
      );

      setCurrentStep("otp");
    } catch (err) {
      let errorMessage = "Something went wrong!";

      if (err instanceof AxiosError && err.response?.data.message) {
        errorMessage = err.response?.data.message;
      } else if (err instanceof Error) errorMessage = err.message;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitOTP = async (data: OTPFormData) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post<
        TResponse<{ resetToken: string }>
      >("/auth/verify-otp", { email, ...data });
      settoken(response?.data?.data?.resetToken as string);
      setCurrentStep("password");
    } catch (err) {
      let errorMessage = "Something went wrong!";

      if (err instanceof AxiosError && err.response?.data.message) {
        errorMessage = err.response?.data.message;
      } else if (err instanceof Error) errorMessage = err.message;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitPassword = async (data: PasswordFormData) => {
    setIsLoading(true);
    try {
      await axiosInstance.post<TResponse<{ otp: string }>>(
        "/auth/reset-password",
        {
          token,
          newPassword: data.password,
        }
      );
      setCurrentStep("success");
    } catch (err) {
      let errorMessage = "Something went wrong!";

      if (err instanceof AxiosError && err.response?.data.message) {
        errorMessage = err.response?.data.message;
      } else if (err instanceof Error) errorMessage = err.message;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (currentStep === "otp") setCurrentStep("email");
    if (currentStep === "password") setCurrentStep("otp");
  };

  const resetFlow = () => {
    setCurrentStep("email");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
      {/* Container */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {currentStep === "email" && "Reset Password"}
            {currentStep === "otp" && "Verify OTP"}
            {currentStep === "password" && "New Password"}
            {currentStep === "success" && "Password Reset"}
          </h1>
          <p className="text-white/80">
            {currentStep === "email" &&
              "Enter your email to receive a reset code"}
            {currentStep === "otp" &&
              "Enter the 6-digit code sent to your email"}
            {currentStep === "password" && "Create a new secure password"}
            {currentStep === "success" &&
              "Your password has been successfully reset"}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          <div
            className={`flex items-center ${
              currentStep === "email"
                ? "text-yellow-400"
                : currentStep === "otp" ||
                  currentStep === "password" ||
                  currentStep === "success"
                ? "text-green-400"
                : "text-white/50"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === "email"
                  ? "bg-yellow-400/20"
                  : currentStep === "otp" ||
                    currentStep === "password" ||
                    currentStep === "success"
                  ? "bg-green-400/20"
                  : "bg-white/10"
              }`}
            >
              {currentStep === "otp" ||
              currentStep === "password" ||
              currentStep === "success" ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Mail className="w-5 h-5" />
              )}
            </div>
            <span className="ml-2 text-sm font-medium">Email</span>
          </div>
          <div
            className={`flex items-center ${
              currentStep === "otp"
                ? "text-yellow-400"
                : currentStep === "password" || currentStep === "success"
                ? "text-green-400"
                : "text-white/50"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === "otp"
                  ? "bg-yellow-400/20"
                  : currentStep === "password" || currentStep === "success"
                  ? "bg-green-400/20"
                  : "bg-white/10"
              }`}
            >
              {currentStep === "password" || currentStep === "success" ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <span className="text-sm font-bold">OTP</span>
              )}
            </div>
            <span className="ml-2 text-sm font-medium">Verify</span>
          </div>
          <div
            className={`flex items-center ${
              currentStep === "password"
                ? "text-yellow-400"
                : currentStep === "success"
                ? "text-green-400"
                : "text-white/50"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === "password"
                  ? "bg-yellow-400/20"
                  : currentStep === "success"
                  ? "bg-green-400/20"
                  : "bg-white/10"
              }`}
            >
              {currentStep === "success" ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
            </div>
            <span className="ml-2 text-sm font-medium">Reset</span>
          </div>
        </div>

        {/* Email Step */}
        {currentStep === "email" && (
          <form
            onSubmit={handleEmailSubmit(onSubmitEmail)}
            className="space-y-6"
          >
            <div>
              <label className="text-white text-sm mb-2 block">Email</label>
              <input
                type="email"
                {...registerEmail("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                placeholder="Enter your email"
              />
              {emailErrors.email && (
                <p className="text-red-300 text-sm">
                  {emailErrors.email.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-lg"
            >
              {isLoading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>
        )}

        {/* OTP Step */}
        {currentStep === "otp" && (
          <form onSubmit={handleOTPSubmit(onSubmitOTP)} className="space-y-6">
            <div>
              <label className="text-white text-sm mb-2 block">OTP</label>
              <input
                type="text"
                maxLength={4}
                {...registerOTP("otp", {
                  required: "OTP is required",
                  pattern: {
                    value: /^\d{4}$/,
                    message: "OTP must be 4 digits",
                  },
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-center tracking-widest font-mono"
                placeholder="0000"
              />
              {otpErrors.otp && (
                <p className="text-red-300 text-sm">{otpErrors.otp.message}</p>
              )}
              <p className="mt-2 text-sm text-white/70">
                Code sent to{" "}
                <span className="font-medium text-white">{email}</span>
              </p>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={goBack}
                className="flex-1 bg-white/10 text-white py-3 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4 inline mr-2" />
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-lg"
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>
            </div>
          </form>
        )}

        {/* Password Step */}
        {currentStep === "password" && (
          <form
            onSubmit={handlePasswordSubmit(onSubmitPassword)}
            className="space-y-6"
          >
            <div>
              <label className="text-white text-sm mb-2 block">
                New Password
              </label>
              <input
                type="password"
                {...registerPassword("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                    message: "Include upper, lower, number, and special char",
                  },
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                placeholder="Enter new password"
              />
              {passwordErrors.password && (
                <p className="text-red-300 text-sm">
                  {passwordErrors.password.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-white text-sm mb-2 block">
                Confirm Password
              </label>
              <input
                type="password"
                {...registerPassword("confirmPassword", {
                  required: "Please confirm password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                placeholder="Confirm password"
              />
              {passwordErrors.confirmPassword && (
                <p className="text-red-300 text-sm">
                  {passwordErrors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={goBack}
                className="flex-1 bg-white/10 text-white py-3 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4 inline mr-2" />
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-lg"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        )}

        {/* Success Step */}
        {currentStep === "success" && (
          <div className="text-center space-y-6">
            <CheckCircle className="mx-auto text-green-400 w-12 h-12" />
            <p className="text-white text-lg font-semibold">
              Password Reset Successfully
            </p>
            <div className="flex gap-4">
              <button
                onClick={resetFlow}
                className="flex-1 bg-white/10 text-white py-3 rounded-lg"
              >
                Reset Another
              </button>
              <Link
                to="/login"
                className="flex-1 bg-blue-500 text-white py-3 rounded-lg text-center"
              >
                Go to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordResetFlow;

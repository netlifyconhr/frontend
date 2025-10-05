// context/AuthContext.tsx
import { tokenKey } from "@/constant/api";
import type { IUser } from "@/interface/user";
import axiosInstance, {
  type CustomAxiosRequestConfig,
} from "@/lib/axios-instance";
import React, { createContext, useContext, useEffect, useState } from "react";
import logo from "../assets/OnlyNicon.png";

type AuthContextType = {
  user: IUser | null;
  login: (payload: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (payload: { email: string; password: string }) => {
    const res = await axiosInstance.post("/auth/login", payload);
    const token = await res?.data.data?.accessToken;
    console.log(res, "res");
    localStorage.setItem(tokenKey, token);

    await fetchUser(token); // Call /me after login
  };

  const logout = () => {
    localStorage.removeItem(tokenKey);
    setUser(null);
    location.href = "/login";
  };

  const fetchUser = async (accessToken?: string) => {
    const token = accessToken || localStorage.getItem(tokenKey);
    if (!token) return;
    try {
      const res = await axiosInstance.get("/user/me", {
        token: token,
      } as CustomAxiosRequestConfig);

      setUser(res.data?.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{loading?<div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="animate-pulse">
        <img className="w-24 h-24" src={logo} alt="Logo" />
      </div>
    </div>  :children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

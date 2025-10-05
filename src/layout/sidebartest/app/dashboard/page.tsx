import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import AuthUser from "@/features/dashboard/components/AuthUser";
import { Navigate, Outlet } from "react-router-dom";
import { AppSidebar } from "../../components/app-sidebar";

export default function SidebarPage() {
  const { user } = useAuth();
  if(!user) {

    return <Navigate to={'/login'} />
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex  shrink-0 items-center gap-2 transition-[width,height] ease-linear  py-2.5 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent  bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200    duration-300">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1 text-black" />
            <Separator
              orientation="vertical"
              className="mr-2 h-4 text-black bg-black"
            />
            <div className="flex items-center justify-between flex-1 ">
              <div className="">
                <h1 className="text-md md:text-lg  font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-gray-600 text-xs md:text-sm">
                  Welcome back {user?.name}! Here's what's happening with your
                  team today.
                </p>
              </div>
              <div className="flex items-center space-x-4 relative">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center">
                  <AuthUser />
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

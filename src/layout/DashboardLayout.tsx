import {
  AlertCircle,
  Award,
  BarChart3,
  Briefcase,
  Building,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  FileMinus,
  FileSignature,
  FileText,
  LogOut,
  Mail,
  Settings,
  Shield,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Nlogo from "../assets/OnlyNicon.png";
import { useAuth } from "@/context/AuthContext";
import AuthUser from "@/features/dashboard/components/AuthUser";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface MenuItem {
  url: string;
  label: string;
  isBlocked: boolean;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const SidebarSkeleton = ({
  sidebarCollapsed,
}: {
  sidebarCollapsed: boolean;
}) => {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className={`h-10 rounded-md bg-slate-700/50 ${
            sidebarCollapsed ? "w-10 mx-auto" : "w-full"
          }`}
        ></div>
      ))}
    </div>
  );
};

const MainContentSkeleton = ({
  sidebarCollapsed,
}: {
  sidebarCollapsed: boolean;
}) => {
  return (
    <div
      className={`transition-all duration-300 ${
        sidebarCollapsed ? "ml-16" : "ml-64"
      }`}
    >
      <header
        className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 p-4 transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? "4rem" : "16rem",
          height: "87px",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="ms-3 space-y-2">
            <div className="h-6 w-48 bg-slate-200 rounded-md animate-pulse" />
            <div className="h-4 w-64 bg-slate-200 rounded-md animate-pulse" />
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-300 animate-pulse" />
        </div>
      </header>

      <main className=" h-screen custom-scrollbar overflow-y-auto px-2 md:px-6 pt-[90px] pb-6 space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 bg-slate-100 rounded-lg animate-pulse" />
        ))}
      </main>
    </div>
  );
};

const DashboardLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([""]);
  const activeItem = location.pathname;
  const navigate = useNavigate();

  const { user, loading } = useAuth();
  useEffect(() => {
    if (!loading && !user?.email) {
      // navigate("/login");
    }
  }, [loading]);

  const menuItems: MenuItem[] = [
    {
      url: "/dashboard",
      isBlocked: false,
      label: "Dashboard",
      icon: <BarChart3 className="w-3.5 md:w-5" />,
    },
    {
      url: "employees",
      isBlocked: false,
      label: "Employees",
      icon: <Users className="w-3.5 md:w-5" />,
      children: [
        {
          url: "all-employees",
          isBlocked: true,
          label: "All Employees",
          icon: <Users className="w-3.5 md:w-4" />,
        },
        {
          url: "add-employee",
          isBlocked: true,
          label: "Add Employee",
          icon: <UserPlus className="w-3.5 md:w-4" />,
        },
        {
          url: "attendance",
          isBlocked: true,
          label: "Attendance",
          icon: <UserCheck className="w-3.5 md:w-4" />,
        },
      ],
    },
    {
      url: "payroll",
      isBlocked: false,
      label: "Payroll",
      icon: <DollarSign className="w-3.5 md:w-5" />,
      children: [
        {
          url: "salary-management",
          isBlocked: true,
          label: "Salary Management",
          icon: <DollarSign className="w-3.5 md:w-4" />,
        },
        {
          url: "/dashboard/payslips",
          isBlocked: false,
          label: "Payslips",
          icon: <FileText className="w-3.5 md:w-4" />,
        },
        {
          url: "bonuses",
          isBlocked: true,
          label: "Bonuses",
          icon: <Award className="w-3.5 md:w-4" />,
        },
      ],
    },
    {
      url: "leave",
      isBlocked: true,
      label: "Leave Management",
      icon: <Calendar className="w-3.5 md:w-5" />,
      children: [
        {
          url: "leave-requests",
          isBlocked: true,
          label: "Leave Requests",
          icon: <Clock className="w-3.5 md:w-4" />,
        },
        {
          url: "leave-balance",
          isBlocked: true,
          label: "Leave Balance",
          icon: <Calendar className="w-3.5 md:w-4" />,
        },
      ],
    },
    {
      url: "hr-operations",
      isBlocked: false,
      label: "HR Operations",
      icon: <Briefcase className="w-3.5 md:w-5" />,
      children: [
        {
          url: "/dashboard/offer-letter",
          isBlocked: false,
          label: "Send Offer Letter",
          icon: <Mail className="w-3.5 md:w-4" />,
        },
        {
          url: "warning-letter",
          isBlocked: true,
          label: "Warning Letter",
          icon: <AlertCircle className="w-3.5 md:w-4" />,
        },
        {
          url: "/dashboard/experience-letter",
          isBlocked: false,
          label: "Experience Letter",
          icon: <Award className="w-3.5 md:w-4" />,
        },
        {
          url: "/dashboard/relieving-letter",
          isBlocked: false,
          label: "Relieving Letter",
          icon: <FileMinus className="w-3.5 md:w-4" />,
        },
        {
          url: "/dashboard/exam-form-management",
          isBlocked: true,
          label: "Manage Exam Forms",
          icon: <FileSignature className="w-3.5 md:w-4" />,
        },
        {
          url: "onboarding-tracker",
          isBlocked: true,
          label: "Onboarding Tracker",
          icon: <UserPlus className="w-3.5 md:w-4" />,
        },
        {
          url: "exit-process",
          isBlocked: true,
          label: "Exit Process",
          icon: <LogOut className="w-3.5 md:w-4" />,
        },
      ],
    },

    {
      url: "organization",
      isBlocked: false,
      label: "Organization",
      icon: <Building className="w-3.5 md:w-5" />,
      children: [
        {
          url: "departments",
          isBlocked: true,
          label: "Departments",
          icon: <Building className="w-3.5 md:w-4" />,
        },
        {
          url: "roles",
          isBlocked: true,
          label: "Roles & Permissions",
          icon: <Shield className="w-3.5 md:w-4" />,
        },
      ],
    },
    {
      url: "settings",
      isBlocked: true,
      label: "Settings",
      icon: <Settings className="w-3.5 md:w-5" />,
    },
  ];

  const toggleExpanded = (url: string) => {
    setExpandedItems((prev) =>
      prev.includes(url) ? prev.filter((id) => id !== url) : [...prev, url]
    );
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isExpanded = expandedItems.includes(item.url);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = activeItem === item.url;
    const baseClasses =
      "text-xs md:text-[15px] flex items-center justify-between p-3 rounded-lg transition-all duration-200 group";
    const levelClass = level > 0 ? "ml-4 py-2" : "";
    const activeClass = isActive
      ? "bg-gradient-to-r from-red-500/20 to-blue-500/20 border border-red-500/30"
      : "hover:bg-gradient-to-r hover:from-red-500/10 hover:to-blue-500/10";

    const blockedClass = item.isBlocked
      ? "cursor-not-allowed opacity-50 hover:bg-transparent"
      : "cursor-pointer";
    return (
      <div key={item.url} className={levelClass}>
        <div
          className={`${baseClasses} ${activeClass} ${blockedClass}`}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.url);
            } else {
              if (!item.isBlocked) {
                navigate(item.url);
              } else {
                toast.error(
                  "Module not purchases.Please contact system admin!"
                );
              }
              // setActiveItem(item.id);
            }
          }}
        >
          <div className="flex items-center space-x-3">
            <span
              className={`transition-colors ${
                isActive ? "text-white" : "text-gray-300 group-hover:text-white"
              }`}
            >
              {item.icon}
            </span>
            {!sidebarCollapsed && (
              <span
                className={`transition-colors font-light ${
                  isActive
                    ? "text-white"
                    : "text-gray-300 group-hover:text-white"
                }`}
              >
                {item.label}
              </span>
            )}
          </div>
          {hasChildren && !sidebarCollapsed && (
            <span
              className={`transition-colors ${
                isActive ? "text-white" : "text-gray-400 group-hover:text-white"
              }`}
            >
              {isExpanded ? (
                <ChevronDown className="w-3.5 md:w-4" />
              ) : (
                <ChevronRight className="w-3.5 md:w-4" />
              )}
            </span>
          )}
        </div>
        {hasChildren && isExpanded && !sidebarCollapsed && (
          <div className="ml-2 space-y-1 custom-scrollbar  overflow-y-auto">
            {item.children?.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen custom-scrollbar bg-gradient-to-br from-red-50 via-blue-50 to-green-50">
      <div
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl transition-all duration-300 z-50 ${
          sidebarCollapsed ? "w-18" : "w-64"
        }`}
      >
        <div
          className="flex items-center justify-between p-4 border-b border-slate-700 "
          style={{ height: "87px" }}
        >
          <button className="absolute -right-2 bg-black">
            {sidebarCollapsed ? (
              <ChevronLeft
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-6 h-6   text-white cursor-pointer"
              />
            ) : (
              <ChevronRight
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-6 h-6   text-white cursor-pointer"
              />
            )}
          </button>
          {!sidebarCollapsed && (
            <Link to="/dashboard">
              <div className="flex items-center gap-1">
                <img
                  src={Nlogo}
                  alt="logo"
                  className="h-8  w-8 object-contain"
                />
                <h1 className="text-md font-bold text-white">
                  <span className=" text-red-500 si">N</span>etlifyCon- H
                  <span className=" text-blue-700">R</span>
                </h1>
              </div>
            </Link>
          )}
          {sidebarCollapsed && (
            <Link to="/dashboard">
              <img src={Nlogo} alt="logo" className="h-8  w-8 object-contain" />
            </Link>
          )}
        </div>

        <nav className="p-4 space-y-2 custom-scrollbar h-screen overflow-y-auto">
          {loading ? (
            <SidebarSkeleton sidebarCollapsed={sidebarCollapsed} />
          ) : (
            menuItems.map((item) => renderMenuItem(item))
          )}
        </nav>
      </div>

      {loading ? (
        <MainContentSkeleton sidebarCollapsed={sidebarCollapsed} />
      ) : (
        <div
          className={`transition-all duration-300 ${
            sidebarCollapsed ? "ml-16" : "ml-64"
          }`}
        >
          <header
            className="fixed top-0 left-0 right-0 z-40  bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 p-4 ml-16 transition-all duration-300"
            style={{
              marginLeft: sidebarCollapsed ? "4rem" : "16rem",
              height: "87px",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="ms-3">
                <h1 className="text-lg md:text-2xl  font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-gray-600 text-xs md:text-[15px]">
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
          </header>

          <main className=" h-screen custom-scrollbar overflow-y-auto px-2 md:px-6 pt-[90px] pb-6">
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;

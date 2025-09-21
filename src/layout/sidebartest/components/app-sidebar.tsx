"use client";

import {
  AlertCircle,
  Award,
  BarChart3,
  Briefcase,
  CalendarCheck,
  Clock,
  DollarSign,
  FileMinus,
  FileSignature,
  FileText,
  LogOut,
  Mail,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "../components/nav-main";
import { TeamSwitcher } from "../components/team-switcher";
import { UserRole } from "@/interface/user";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      url: "/dashboard",
      isBlocked: false,
      title: "Dashboard",
      icon: BarChart3,
    },
    {
      url: "employees",
      // isBlocked: false,
      title: "Employees",
      icon: Users,

      items: [
        {
          url: "all-employees",
          title: "All Employees",
          isBlocked: true,
        },
      ],
    },
    {
      title: "Payroll",
      url: "/dashbaord/employyes",
      icon: DollarSign,
      isActive: true,
      items: [
        {
          url: "salary-management",
          isBlocked: true,
          title: "Salary Management",
          icon: DollarSign,
        },
        {
          url: "/dashboard/payslips",
          isBlocked: false,
          title: "Payslips",
          icon: FileText,
        },
        {
          url: "bonuses",
          isBlocked: true,
          title: "Bonuses",
          icon: Award,
        },
      ],
    },
    {
      title: "HR Operations",
      icon: Briefcase,
      url: "#",
      items: [
        {
          title: "Background KYC Check",
          url: "/dashboard/background-check",
          icon: ShieldCheck,
          roles: [UserRole.SUPERADMIN, UserRole.ADMIN],
        },
        {
          url: "/dashboard/offer-letter",
          isBlocked: false,
          title: "Send Offer Letter",
          icon: Mail,
        },
        {
          url: "warning-letter",
          isBlocked: true,
          title: "Warning Letter",
          icon: AlertCircle,
        },
        {
          url: "/dashboard/experience-letter",
          isBlocked: false,
          title: "Experience Letter",
          icon: Award,
        },
        {
          url: "/dashboard/relieving-letter",
          isBlocked: false,
          title: "Relieving Letter",
          icon: FileMinus,
        },
        {
          url: "/dashboard/exam-form-management",
          isBlocked: true,
          title: "Manage Exam Forms",
          icon: FileSignature,
        },
        {
          url: "onboarding-tracker",
          isBlocked: true,
          title: "Onboarding Tracker",
          icon: UserPlus,
        },
        {
          url: "exit-process",
          isBlocked: true,
          title: "Exit Process",
          icon: LogOut,
        },
      ],
    },
    {
      url: "leave-management",
      title: "Leave Management",
      icon: CalendarCheck,
      items: [
        {
          url: "leave-requests",
          title: "Leave Requests",
          isBlocked: true,
        },
        {
          url: "approved-leaves",
          title: "Approved Leaves",
          isBlocked: true,
        },
        {
          url: "rejected-leaves",
          title: "Rejected Leaves",
          isBlocked: true,
        },
      ],
    },

    {
      url: "attendance",
      title: "Attendance",
      icon: Clock, // replace with appropriate icon
      items: [
        {
          url: "daily-attendance",
          title: "Daily Attendance",
          isBlocked: true,
        },
        {
          url: "attendance-summary",
          title: "Attendance Summary",
          isBlocked: true,
        },
        {
          url: "absent-report",
          title: "Absent Report",
          isBlocked: true,
        },
        {
          url: "late-comers",
          title: "Late Comers",
          isBlocked: true,
        },
        {
          url: "manual-entries",
          title: "Manual Entries",
          isBlocked: true, // example if you want to restrict it
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl transition-all duration-300 z-50"
    >
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

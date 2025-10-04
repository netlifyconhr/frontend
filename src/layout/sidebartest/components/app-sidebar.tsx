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
import { UserRole } from "@/interface/user";
import { NavMain } from "../components/nav-main";
import { TeamSwitcher } from "../components/team-switcher";

// This is sample data.
const data = {
  
  navMain: [
    {
      url: "/dashboard",
      isBlocked: false,
      title: "Dashboard",
      icon: BarChart3,
          roles: [UserRole.SUPERADMIN, UserRole.ADMIN,UserRole.USER],

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
          roles: [UserRole.SUPERADMIN, UserRole.ADMIN,UserRole.USER],

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
          roles: [UserRole.SUPERADMIN, UserRole.ADMIN,UserRole.USER],

        },
        {
          url: "/dashboard/payslips",
          isBlocked: false,
          title: "Payslips",
          icon: FileText,
          roles: [UserRole.SUPERADMIN, UserRole.ADMIN,UserRole.USER],

        },
        {
          url: "bonuses",
          isBlocked: true,
          title: "Bonuses",
          icon: Award,
          roles: [UserRole.SUPERADMIN, UserRole.ADMIN,UserRole.USER],

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
          roles: [UserRole.SUPERADMIN, UserRole.ADMIN,UserRole.USER,UserRole.VERIFIER],
        },
        {
          url: "/dashboard/offer-letter",
          isBlocked: false,
          title: "Send Offer Letter",
          icon: Mail,
          roles: [UserRole.SUPERADMIN, UserRole.ADMIN,UserRole.USER],

        },
        {
          url: "warning-letter",
          isBlocked: true,
          title: "Warning Letter",
          icon: AlertCircle,
          roles: [UserRole.SUPERADMIN, UserRole.ADMIN,UserRole.USER],

        },
        {
          url: "/dashboard/experience-letter",
          isBlocked: false,
          title: "Experience Letter",
          icon: Award,
          roles: [UserRole.SUPERADMIN, UserRole.ADMIN,UserRole.USER],

        },
        {
          url: "/dashboard/relieving-letter",
          isBlocked: false,
          title: "Relieving Letter",
          icon: FileMinus,
          roles: [UserRole.SUPERADMIN, UserRole.ADMIN,UserRole.USER],

        },
        {
          url: "/dashboard/exam-form-management",
          isBlocked: true,
          title: "Manage Exam Forms",
          icon: FileSignature,
          roles: [UserRole.SUPERADMIN, UserRole.ADMIN,UserRole.USER],

        },
        {
          url: "onboarding-tracker",
          isBlocked: true,
          title: "Onboarding Tracker",
          icon: UserPlus,
          roles: [UserRole.SUPERADMIN, UserRole.ADMIN,UserRole.USER],

        },
        {
          url: "exit-process",
          isBlocked: true,
          title: "Exit Process",
          icon: LogOut,
          roles: [UserRole.SUPERADMIN, UserRole.ADMIN,UserRole.USER],

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

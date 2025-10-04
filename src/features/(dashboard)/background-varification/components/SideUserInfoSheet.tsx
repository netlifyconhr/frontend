import { Sheet, SheetContent } from "@/components/ui/sheet";

import dummyuserImg from "@/assets/dummy-user.jpg";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/layout/sidebartest/components/ui/badge";
import { Tooltip } from "@radix-ui/react-tooltip";
import {
  Building,
  Clock,
  Mail,
  Phone,
  ShieldAlert,
  ShieldCheck
} from "lucide-react";
import type { ReactNode } from "react";
import type { BackgroundVarificationType, } from "../types";


type StatusType = "Verified" | "Pending" | "Warning" | string;

interface StatusBadgeProps {
  label: string;
  status: StatusType;
  tooltipContent?: ReactNode;
}

const getStatusConfig = (status: StatusType) => {
  if (!status || status === "Pending") {
    return {
      variant: "outline" as const,
      icon: Clock,
    };
  }
  
  if (status === "Verified") {
    return {
      variant: "success" as const,
      icon: ShieldCheck,
    };
  }
  
  // Warning or any other status
  return {
    variant: "destructive" as const,
    icon: ShieldAlert,
  };
};


export const StatusBadge = ({ 
  label, 
  status, 
  tooltipContent 
}: StatusBadgeProps) => {
  const { variant, icon: Icon } = getStatusConfig(status);

  const badge = (
    <Badge variant={variant} className="flex gap-1 items-center">
      {label} <Icon size={12} />
    </Badge>
  );

  if (tooltipContent) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        {tooltipContent && (
          <TooltipContent>
            {tooltipContent}
          </TooltipContent>
        )}
      </Tooltip>
    );
  }

  return badge;
};
export default function SideUserInfoSheet({
  open,
  handleChange,
  userInfo,
}: {
  open: boolean;
  handleChange: VoidFunction;
  userInfo: BackgroundVarificationType;
}) {
  const employeeData = {
    name: userInfo?.employeeName,
    position: userInfo?.employeeDesignation,
    profileImage: dummyuserImg,
    personalInfo: {
      employeeId: "EMP-00" + userInfo?._id?.slice(-3),
      dateOfBirth: "March 15, 1990",
      bloodGroup: "O+",
      nationality: "India",
      maritalStatus: "Married",
    },
    contactInfo: {
      email: userInfo?.employeeEmail,
      phone: "+1 (555) 123-4567",
      emergencyContact: "+1 (555) 987-6543",
      address: "123 Tech Street, San Francisco, CA 94105",
    },
    education: {
      degree: "Master of Computer Science",
      university: "Stanford University",
      graduationYear: "2014",
      specialization: "Software Engineering",
    },
    experience: {
      totalYears: "9 years",
      currentRole: "5 years",
      previousCompanies: "Google, Microsoft",
      skills: "React, Node.js, Python, AWS",
    },
    familyInfo: {
      fatherName: "Robert Johnson",
      fatherContact: "+1 (555) 456-7890",
      motherName: "Linda Johnson",
      spouseName: "Michael Smith",
    },
    workInfo: {
      department: "Engineering",
      manager: "John Davis",
      joinDate: "January 15, 2019",
      location: "San Francisco Office",
    },
  };

  console.log(employeeData,"employeeData")
  return (
    <Sheet open={open} onOpenChange={handleChange}>
      <SheetContent className="">
        <div className="grid flex-1 auto-rows-min gap-6 ">
          <div className="flex-col flex items-center justify-center  ">
            {/* Header Section */}
            <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-center relative">
              <img
                src={employeeData.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto  object-cover"
              />
              <h1 className="text-2xl font-bold text-white ">
                {userInfo?.companyName||"Woodrock private limited"} 
              </h1>
               <h1 className="text-lg font-bold text-white ">
                {employeeData.name} 
                  <span className="text-white"> ({userInfo?.employeeGender})</span>
                
              </h1>
              <p className="text-indigo-100 text-lg">{employeeData.position}</p>
              <div className="absolute top-4 left-4 bg-white/20 rounded-lg px-3 py-1">
                <span className="text-white text-sm font-semibold">
                  ID: {employeeData.personalInfo.employeeId}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 py-3">
                       <StatusBadge 
                       label="Pan" 
                       status={userInfo?.panStatus}
                       
                       tooltipContent={`PAN Status: ${userInfo?.panStatus||'Pending'}`}
                     />
                     <StatusBadge 
                       label="Education" 
                       status={userInfo?.educationStatus}
                        
                       tooltipContent={`educationStatus Status: ${userInfo?.educationStatus||'Pending'}`}
                     />
                     <StatusBadge 
                       label="Aadhar" 
                       status={userInfo?.adharStatus}
                        
                       tooltipContent={`Aadhar Status: ${userInfo?.adharStatus||'Pending'}`}
                     />
                     <StatusBadge 
                       label="Experience" 
                       status={userInfo?.experienceStatus}
                        
                       tooltipContent={`Experience Status: ${userInfo?.experienceStatus||'Pending'}`}
                     />
            </div>
            {/* Content Section */}
            <div className=" max-h-96 overflow-y-auto space-y-4">
               {/* Work Information */}
              <div className="">
                <div className="flex items-center mb-3">
                  <Building className="w-5 h-5 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Work Information
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Department:</span>
                    <p className="font-medium">
                                        {userInfo?.employeeDepartment}

                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Designation:</span>
                    <p className="font-medium">
                     {userInfo?.employeeDesignation}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Join Date:</span>
                    <p className="font-medium">
                      {userInfo?.employeeDateOfJoin}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Branch:</span>
                    <p className="font-medium">
                    {userInfo?.companyBranch}
                    </p>
                  </div>
                   <div>
                    <span className="text-gray-500">Region:</span>
                    <p className="font-medium">
                    {userInfo?.companyRegion}
                    </p>
                  </div>
                </div>
              </div>
              {/* Personal Information */}
              {/* <div className="mb-6">
                <div className="flex items-center mb-3">
                  <User className="w-5 h-5 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Personal Information
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Date of Birth:</span>
                    <p className="font-medium">
                      {employeeData.personalInfo.dateOfBirth}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Blood Group:</span>
                    <p className="font-medium text-red-600">
                      {employeeData.personalInfo.bloodGroup}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Nationality:</span>
                    <p className="font-medium">
                      {employeeData.personalInfo.nationality}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Marital Status:</span>
                    <p className="font-medium">
                      {employeeData.personalInfo.maritalStatus}
                    </p>
                  </div>
                </div>
              </div> */}

              {/* Contact Information */}
              <div className="">
                <div className="flex items-center mb-3">
                  <Phone className="w-5 h-5 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Contact Information
                  </h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-blue-600">
                      {employeeData.contactInfo.email}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{userInfo?.employeePhone||"N/A"}</span>
                  </div>
                
                  {/* <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                    <span className="leading-tight">
                      {employeeData.contactInfo.address}
                    </span>
                  </div> */}
                </div>
              </div>

              {/* Education */}
              {/* <div className="mb-6">
                <div className="flex items-center mb-3">
                  <GraduationCap className="w-5 h-5 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Education
                  </h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-sm">
                  <p className="font-semibold text-gray-800">
                    {employeeData.education.degree}
                  </p>
                  <p className="text-gray-600">
                    {employeeData.education.university}
                  </p>
                  <p className="text-gray-500">
                    Graduated: {employeeData.education.graduationYear}
                  </p>
                  <p className="text-gray-500">
                    Specialization: {employeeData.education.specialization}
                  </p>
                </div>
              </div> */}

             
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

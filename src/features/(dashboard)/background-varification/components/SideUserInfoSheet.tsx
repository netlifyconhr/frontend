import { Sheet, SheetContent } from "@/components/ui/sheet";

import {
  Briefcase,
  Building,
  Check,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  ShieldCheck,
  User,
  Users,
  X,
} from "lucide-react";
import type { IOfferLetter } from "../types";
import { Badge } from "@/layout/sidebartest/components/ui/badge";
import dummyuserImg from "@/assets/dummy-user.jpg";

export default function SideUserInfoSheet({
  open,
  handleChange,
  userInfo,
}: {
  open: boolean;
  handleChange: VoidFunction;
  userInfo: IOfferLetter;
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
  return (
    <Sheet open={open} onOpenChange={handleChange}>
      <SheetContent className="">
        <div className="grid flex-1 auto-rows-min gap-6 ">
          <div className="flex-col flex items-center justify-center  ">
            {/* Header Section */}
            <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-center relative">
              <img
                src={employeeData.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto mb-4 object-cover"
              />
              <h1 className="text-2xl font-bold text-white mb-2">
                {employeeData.name}
              </h1>
              <p className="text-indigo-100 text-lg">{employeeData.position}</p>
              <div className="absolute top-4 left-4 bg-white/20 rounded-lg px-3 py-1">
                <span className="text-white text-sm font-semibold">
                  ID: {employeeData.personalInfo.employeeId}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 py-3">
              <Badge variant="outline">Adhar</Badge>
              <Badge variant="destructive" className="flex gap-1 items-center">
                Pan
                <X size={12} />
              </Badge>
              <Badge variant="success" className="flex gap-1 items-center">
                Education <Check size={12} />
              </Badge>
              <Badge variant="outline">Experience</Badge>
            </div>
            {/* Content Section */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {/* Personal Information */}
              <div className="mb-6">
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
              </div>

              {/* Contact Information */}
              <div className="mb-6">
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
                    <span>{employeeData.contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-red-400 mr-2" />
                    <span>
                      Emergency: {employeeData.contactInfo.emergencyContact}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                    <span className="leading-tight">
                      {employeeData.contactInfo.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="mb-6">
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
              </div>

              {/* Experience */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <Briefcase className="w-5 h-5 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Experience
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Total Experience:</span>
                    <p className="font-medium">
                      {employeeData.experience.totalYears}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Current Role:</span>
                    <p className="font-medium">
                      {employeeData.experience.currentRole}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Previous Companies:</span>
                    <p className="font-medium">
                      {employeeData.experience.previousCompanies}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Key Skills:</span>
                    <p className="font-medium text-blue-600">
                      {employeeData.experience.skills}
                    </p>
                  </div>
                </div>
              </div>

              {/* Family Information */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <Users className="w-5 h-5 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Family Information
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Father's Name:</span>
                    <p className="font-medium">
                      {employeeData.familyInfo.fatherName}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Father's Contact:</span>
                    <p className="font-medium">
                      {employeeData.familyInfo.fatherContact}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Mother's Name:</span>
                    <p className="font-medium">
                      {employeeData.familyInfo.motherName}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Spouse Name:</span>
                    <p className="font-medium">
                      {employeeData.familyInfo.spouseName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Work Information */}
              <div className="mb-4">
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
                      {employeeData.workInfo.department}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Manager:</span>
                    <p className="font-medium">
                      {employeeData.workInfo.manager}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Join Date:</span>
                    <p className="font-medium">
                      {employeeData.workInfo.joinDate}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span>
                    <p className="font-medium">
                      {employeeData.workInfo.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

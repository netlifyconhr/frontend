import Table1 from "@/features/dashboard/pages/Table1";
import {
  Award,
  BarChart3,
  Building,
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  DollarSign,
  FileText,
  Settings,
  Shield,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  url: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const AllComponents: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(["employees"]);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
  });

  const menuItems: MenuItem[] = [
    {
      url: "dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      url: "employees",
      label: "Employees",
      icon: <Users className="w-5 h-5" />,
      children: [
        {
          url: "all-employees",
          label: "All Employees",
          icon: <Users className="w-4 h-4" />,
        },
        {
          url: "add-employee",
          label: "Add Employee",
          icon: <UserPlus className="w-4 h-4" />,
        },
        {
          url: "attendance",
          label: "Attendance",
          icon: <UserCheck className="w-4 h-4" />,
        },
      ],
    },
    {
      url: "payroll",
      label: "Payroll",
      icon: <DollarSign className="w-5 h-5" />,
      children: [
        {
          url: "salary-management",
          label: "Salary Management",
          icon: <DollarSign className="w-4 h-4" />,
        },
        {
          url: "payslips",
          label: "Payslips",
          icon: <FileText className="w-4 h-4" />,
        },
        {
          url: "bonuses",
          label: "Bonuses",
          icon: <Award className="w-4 h-4" />,
        },
      ],
    },
    {
      url: "leave",
      label: "Leave Management",
      icon: <Calendar className="w-5 h-5" />,
      children: [
        {
          url: "leave-requests",
          label: "Leave Requests",
          icon: <Clock className="w-4 h-4" />,
        },
        {
          url: "leave-balance",
          label: "Leave Balance",
          icon: <Calendar className="w-4 h-4" />,
        },
      ],
    },
    {
      url: "performance",
      label: "Performance",
      icon: <TrendingUp className="w-5 h-5" />,
      children: [
        {
          url: "reviews",
          label: "Reviews",
          icon: <FileText className="w-4 h-4" />,
        },
        { url: "goals", label: "Goals", icon: <Award className="w-4 h-4" /> },
      ],
    },
    {
      url: "organization",
      label: "Organization",
      icon: <Building className="w-5 h-5" />,
      children: [
        {
          url: "departments",
          label: "Departments",
          icon: <Building className="w-4 h-4" />,
        },
        {
          url: "roles",
          label: "Roles & Permissions",
          icon: <Shield className="w-4 h-4" />,
        },
      ],
    },
    {
      url: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
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

    return (
      <div key={item.url} className={`${level > 0 ? "ml-4" : ""}`}>
        <div
          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
            level > 0 ? "py-2" : ""
          } ${
            isActive
              ? "bg-gradient-to-r from-red-500/20 to-blue-500/20 border border-red-500/30"
              : "hover:bg-gradient-to-r hover:from-red-500/10 hover:to-blue-500/10"
          }`}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.url);
            } else {
              navigate(`/dashboard/${item.url}`);
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
                className={`transition-colors font-medium ${
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
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          )}
        </div>
        {hasChildren && isExpanded && !sidebarCollapsed && (
          <div className="ml-2 space-y-1">
            {item.children?.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Dashboard Content */}
      <div className="my-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Typography Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Heading 1
              </h1>
              <h2 className="text-3xl font-semibold text-gray-700 mb-2">
                Heading 2
              </h2>
              <h3 className="text-2xl font-medium text-gray-600 mb-2">
                Heading 3
              </h3>
              <h4 className="text-xl font-medium text-gray-600 mb-2">
                Heading 4
              </h4>
              <p className="text-gray-600 mb-2">
                Regular paragraph text with normal weight
              </p>
              <p className="text-sm text-gray-500">
                Small text for captions and secondary information
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent mb-2">
                Gradient Text Example
              </p>
              <p className="text-green-600 font-medium mb-2">
                Success message text
              </p>
              <p className="text-red-600 font-medium mb-2">
                Error message text
              </p>
              <p className="text-blue-600 font-medium mb-2">
                Info message text
              </p>
              <p className="text-gray-400 italic">Italic subtitle text</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Components */}
      <div className="mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Form Components
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="Enter employee name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="">Select Department</option>
                  <option value="hr">Human Resources</option>
                  <option value="engineering">Engineering</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <textarea
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  rows={3}
                  placeholder="Enter position description"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Employment Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="employment"
                      className="text-red-500 focus:ring-red-500"
                    />
                    <span className="ml-2 text-gray-700">Full-time</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="employment"
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">Part-time</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="employment"
                      className="text-green-500 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700">Contract</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="text-red-500 focus:ring-red-500"
                />
                <label className="text-gray-700">Send welcome email</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skeleton Loaders */}
      <div className="mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Skeleton Loaders
            </h3>
            <button
              onClick={() => setIsLoading(!isLoading)}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-lg hover:from-red-600 hover:to-blue-600 transition-all"
            >
              {isLoading ? "Stop Loading" : "Start Loading"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Circle Skeleton */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Circle Loaders</h4>
              <div className="flex space-x-4">
                <div
                  className={`w-12 h-12 rounded-full ${
                    isLoading
                      ? "bg-gradient-to-r from-red-300 to-blue-300 animate-pulse"
                      : "bg-gray-300"
                  }`}
                />
                <div
                  className={`w-16 h-16 rounded-full ${
                    isLoading
                      ? "bg-gradient-to-r from-blue-300 to-green-300 animate-pulse"
                      : "bg-gray-300"
                  }`}
                />
                <div
                  className={`w-20 h-20 rounded-full ${
                    isLoading
                      ? "bg-gradient-to-r from-green-300 to-red-300 animate-pulse"
                      : "bg-gray-300"
                  }`}
                />
              </div>
            </div>

            {/* Square Skeleton */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Square Loaders</h4>
              <div className="flex space-x-4">
                <div
                  className={`w-12 h-12 rounded-lg ${
                    isLoading
                      ? "bg-gradient-to-r from-red-300 to-blue-300 animate-pulse"
                      : "bg-gray-300"
                  }`}
                />
                <div
                  className={`w-16 h-16 rounded-lg ${
                    isLoading
                      ? "bg-gradient-to-r from-blue-300 to-green-300 animate-pulse"
                      : "bg-gray-300"
                  }`}
                />
                <div
                  className={`w-20 h-20 rounded-lg ${
                    isLoading
                      ? "bg-gradient-to-r from-green-300 to-red-300 animate-pulse"
                      : "bg-gray-300"
                  }`}
                />
              </div>
            </div>

            {/* Rectangle Skeleton */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Rectangle Loaders</h4>
              <div className="space-y-2">
                <div
                  className={`w-full h-4 rounded ${
                    isLoading
                      ? "bg-gradient-to-r from-red-300 to-blue-300 animate-pulse"
                      : "bg-gray-300"
                  }`}
                />
                <div
                  className={`w-3/4 h-4 rounded ${
                    isLoading
                      ? "bg-gradient-to-r from-blue-300 to-green-300 animate-pulse"
                      : "bg-gray-300"
                  }`}
                />
                <div
                  className={`w-1/2 h-4 rounded ${
                    isLoading
                      ? "bg-gradient-to-r from-green-300 to-red-300 animate-pulse"
                      : "bg-gray-300"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent mb-4">
            Button Variants
          </h3>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105">
                Primary Red
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105">
                Primary Blue
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105">
                Primary Green
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-lg hover:from-red-600 hover:to-blue-600 transition-all transform hover:scale-105">
                Gradient Red-Blue
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                Outline Red
              </button>
              <button className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all">
                Outline Blue
              </button>
              <button className="px-6 py-2 border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-all">
                Outline Green
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all">
                Secondary
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* List and Card Components */}
      <div className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* List Component */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
              Employee List
            </h3>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex items-center space-x-4 p-3 bg-gradient-to-r from-red-50 to-blue-50 rounded-lg hover:from-red-100 hover:to-blue-100 transition-all"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {String.fromCharCode(64 + item)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">
                      Employee {item}
                    </h4>
                    <p className="text-sm text-gray-600">Software Engineer</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all">
                      ✓
                    </button>
                    <button className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all">
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card Component */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent mb-4">
              Department Cards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  name: "Engineering",
                  count: 45,
                  color: "from-red-500 to-red-600",
                },
                {
                  name: "Marketing",
                  count: 23,
                  color: "from-blue-500 to-blue-600",
                },
                {
                  name: "HR",
                  count: 12,
                  color: "from-green-500 to-green-600",
                },
                {
                  name: "Finance",
                  count: 18,
                  color: "from-purple-500 to-purple-600",
                },
              ].map((dept) => (
                <div
                  key={dept.name}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 hover:from-gray-100 hover:to-gray-200 transition-all transform hover:scale-105"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${dept.color} rounded-lg flex items-center justify-center mb-3`}
                  >
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800">{dept.name}</h4>
                  <p className="text-2xl font-bold text-gray-900">
                    {dept.count}
                  </p>
                  <p className="text-sm text-gray-600">employees</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Employees</p>
              <p className="text-2xl font-bold text-gray-800">1,234</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Present Today</p>
              <p className="text-2xl font-bold text-gray-800">1,180</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">On Leave</p>
              <p className="text-2xl font-bold text-gray-800">54</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Monthly Payroll</p>
              <p className="text-2xl font-bold text-gray-800">$2.4M</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activities
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-red-50 to-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center">
                <UserPlus className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  New employee onboarded
                </p>
                <p className="text-xs text-gray-600">
                  Sarah Johnson joined Marketing team
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Leave request approved
                </p>
                <p className="text-xs text-gray-600">
                  Mike Davis - Vacation (Dec 20-25)
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Performance review completed
                </p>
                <p className="text-xs text-gray-600">
                  Q4 reviews for Engineering team
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-medium hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105">
              <UserPlus className="w-6 h-6 mx-auto mb-2" />
              Add Employee
            </button>
            <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105">
              <Calendar className="w-6 h-6 mx-auto mb-2" />
              Manage Leave
            </button>
            <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white font-medium hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105">
              <DollarSign className="w-6 h-6 mx-auto mb-2" />
              Process Payroll
            </button>
            <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white font-medium hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105">
              <BarChart3 className="w-6 h-6 mx-auto mb-2" />
              View Reports
            </button>
          </div>
        </div>
      </div>

      <Table1 />
    </>
  );
};

export default AllComponents;

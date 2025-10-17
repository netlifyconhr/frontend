import {
  BarChart3,
  Calendar,
  DollarSign,
  LifeBuoy,
  Mail,
  Phone,
  UserCheck,
  UserPlus,
  Users
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axiosInstance from "@/lib/axios-instance";
import dayjs from 'dayjs'; // if not using dayjs, you can use native Date methods
type StatCardProps = {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  loading?: boolean;
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  gradient,
  loading = false,
}) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm">{title}</p>

        {loading ? (
          <div className="h-6 w-16 bg-gray-300 animate-pulse rounded mt-1" />
        ) : (
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        )}
      </div>

    
        <div
          className={`w-12 h-12 ${gradient} rounded-lg flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      
    </div>
  </div>
);



const STATUS_COUNT_INFO={
  offer:

  {
    title: "Monthly offer letter received",
    value: "234",
    icon: Users,
    gradient: "bg-gradient-to-r from-red-500 to-red-600",
  },
 
   payslip : {
    title: "Total monthly payslip issue",
    value: "180",
    icon: DollarSign,
    gradient: "bg-gradient-to-r from-green-500 to-green-600",
  },
  
   experienc :{
    title: "Total experience letter issue",
    value: "54",
    icon: Calendar,
    gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
  },
  
    release:{
    title: "Total release letter issue",
    value: "54",
    icon: UserCheck,
    gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
  },

}

const Dashboard: React.FC = () => {




const [dashboardCount, setDashboardCount] = useState({
  experience: 0,
  release: 0,
  offer: 0,
  payslip: 0,
});

const [loadingState, setLoadingState] = useState({
  experience: true,
  release: true,
  offer: true,
  payslip: true,
});
useEffect(() => {
  async function getDashboardStats() {
    const startOfMonth = dayjs().startOf('month').toISOString();
    const endOfMonth = dayjs().endOf('month').toISOString();

    const urls = {
      experience: `/experience-letter?createdAt[$gte]=${encodeURIComponent(startOfMonth)}&createdAt[$lte]=${encodeURIComponent(endOfMonth)}`,
      offer: `/offer-letter?createdAt[$gte]=${encodeURIComponent(startOfMonth)}&createdAt[$lte]=${encodeURIComponent(endOfMonth)}`,
      release: `/release-letter?createdAt[$gte]=${encodeURIComponent(startOfMonth)}&createdAt[$lte]=${encodeURIComponent(endOfMonth)}`,
      payslip: `/payslip?createdAt[$gte]=${encodeURIComponent(startOfMonth)}&createdAt[$lte]=${encodeURIComponent(endOfMonth)}`
    };

    // Experience
    setLoadingState(prev => ({ ...prev, experience: true }));
    axiosInstance.get<{ meta: { total: number } }>(urls.experience)
      .then(res => {
        setDashboardCount(prev => ({ ...prev, experience: res.data.meta.total }));
      })
      .catch(() => {
        setDashboardCount(prev => ({ ...prev, experience: 0 }));
      })
      .finally(() => {
        setLoadingState(prev => ({ ...prev, experience: false }));
      });

    // Offer
    setLoadingState(prev => ({ ...prev, offer: true }));
    axiosInstance.get<{ meta: { total: number } }>(urls.offer)
      .then(res => {
        setDashboardCount(prev => ({ ...prev, offer: res.data.meta.total }));
      })
      .catch(() => {
        setDashboardCount(prev => ({ ...prev, offer: 0 }));
      })
      .finally(() => {
        setLoadingState(prev => ({ ...prev, offer: false }));
      });

    // Release
    setLoadingState(prev => ({ ...prev, release: true }));
    axiosInstance.get<{ meta: { total: number } }>(urls.release)
      .then(res => {
        setDashboardCount(prev => ({ ...prev, release: res.data.meta.total }));
      })
      .catch(() => {
        setDashboardCount(prev => ({ ...prev, release: 0 }));
      })
      .finally(() => {
        setLoadingState(prev => ({ ...prev, release: false }));
      });

    // Payslip
    setLoadingState(prev => ({ ...prev, payslip: true }));
    axiosInstance.get<{ meta: { total: number } }>(urls.payslip)
      .then(res => {
        setDashboardCount(prev => ({ ...prev, payslip: res.data.meta.total }));
      })
      .catch(() => {
        setDashboardCount(prev => ({ ...prev, payslip: 0 }));
      })
      .finally(() => {
        setLoadingState(prev => ({ ...prev, payslip: false }));
      });
  }

  getDashboardStats();
}, []);

  
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        

  <StatCard
    key={STATUS_COUNT_INFO.offer.title}
    title={STATUS_COUNT_INFO.offer.title}
    value={dashboardCount.offer}
    icon={STATUS_COUNT_INFO.offer.icon}
    gradient={STATUS_COUNT_INFO.offer.gradient}
    loading={loadingState.offer}
  />
  <StatCard
    key={STATUS_COUNT_INFO.experienc.title}
    title={STATUS_COUNT_INFO.experienc.title}
    value={dashboardCount.experience}
    icon={STATUS_COUNT_INFO.experienc.icon}
    gradient={STATUS_COUNT_INFO.experienc.gradient}
    loading={loadingState.experience}
  />
  <StatCard
    key={STATUS_COUNT_INFO.payslip.title}
    title={STATUS_COUNT_INFO.payslip.title}
    value={dashboardCount.payslip}
    icon={STATUS_COUNT_INFO.payslip.icon}
    gradient={STATUS_COUNT_INFO.payslip.gradient}
    loading={loadingState.payslip}
  />
  <StatCard
    key={STATUS_COUNT_INFO.release.title}
    title={STATUS_COUNT_INFO.release.title}
    value={dashboardCount.release}
    icon={STATUS_COUNT_INFO.release.icon}
    gradient={STATUS_COUNT_INFO.release.gradient}
    loading={loadingState.release}
  />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
       Need Help?
          </h3>
       <div className="flex items-start space-x-4 mb-6">
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-full shadow-md">
      <LifeBuoy className="w-6 h-6 text-white" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        Need Technical Help?
      </h3>
      <p className="text-sm text-gray-600">
        Having trouble with file uploads, employee records, or dashboard access?  
        Reach out to our support team or raise a complaint directly below.
      </p>
    </div>
  </div>

  {/* Support Buttons */}
  <div className="flex flex-col sm:flex-row gap-3 mb-8">
    <a
      href="mailto:admin@netlifycon-hr.in"
      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transition-all shadow-md flex items-center justify-center gap-2"
    >
      <Mail className="w-4 h-4" />
      Email Support
    </a>

    <a
      href="https://wa.me/918420377092"
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all shadow-md flex items-center justify-center gap-2"
    >
      <Phone className="w-4 h-4" />
      Chat on WhatsApp
    </a>
  </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-medium hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105">
              <Link to={"/dashboard/offer-letter"}>
                <UserPlus className="w-6 h-6 mx-auto mb-2" />
                Send Offer Letter
              </Link>
            </button>
            <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105">
              <Link to={"/dashboard/experience-letter"}>
                <Calendar className="w-6 h-6 mx-auto mb-2" />
                Send Experience letter
              </Link>
            </button>
            <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white font-medium hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105">
              <Link to={"/dashboard/relieving-letter"}>
                <DollarSign className="w-6 h-6 mx-auto mb-2" />
                Send Release Letter
              </Link>
            </button>
            <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white font-medium hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105">
              <Link to={"/dashboard/payslips"}>
                <BarChart3 className="w-6 h-6 mx-auto mb-2" />
                Send Salary Slip
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

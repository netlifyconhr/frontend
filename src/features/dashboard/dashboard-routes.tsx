// import { CandidateExamList } from "../candidate-exam/CandidateExamList";
// import DashBoard from "../dashbaord/pages/DashBoard";
// import { EmailList } from "../email/components/EmailList";
// import { SalaryList } from "../email/components/SalaryList";
// import { EmployeeExperienceLetterList } from "../experience-letter/EmployeeExperienceLetterList";
// import { EmployeeReleaseLetterList } from "../release-letter/EmployeeReleaseLetterList";

import AllComponents from "@/components/ALlComponent";
import ExperienceLetterListPage from "../(dashboard)/experience/pages/ExperienceLetterListPage";
// import { PayslipRoutes } from "../(dashboard)/payslip/payslip.routes";
import ExamFormListPage from "../(dashboard)/exam-form/pages/ExamFormListPage";
import OfferLetterListPage from "../(dashboard)/offerletter/pages/OfferLetterListPage";
import PayslipLetterListPage from "../(dashboard)/payslip/pages/PayslipLetterListPage";
import ReleaseLetterListPage from "../(dashboard)/release/pages/ReleaseLetterListPage";
import Dashboard from "./pages/DashBoard";
import ExcelUploadWizard from "../(dashboard)/offerletter/pages/OfferLetterUploadPage";
import PayslipLetterUploadPage from "../(dashboard)/payslip/pages/PayslipLetterUploadPage";
import ReleaseLetterUploadPage from "../(dashboard)/release/pages/ReleaseLetterUploadPage";
import ExperienceLetterUploadPage from "../(dashboard)/experience/pages/ExperienceLetterUploadPage";

export const DashboardRoutes = [
  {
    index: true,
    element: <Dashboard />,
  },
  // {
  //   path: "payslips",
  //   element: <Table1 />,
  // },
  {
    path: "components",
    element: <AllComponents />,
  },

  {
    path: "payslips",
    element: <PayslipLetterListPage />,
    // children: PayslipRoutes,
  },
  {
    path: "payslips-upload",
    element: <PayslipLetterUploadPage />,
    // children: PayslipRoutes,
  },
  {
    path: "offer-letter",
    element: <OfferLetterListPage />,
    // children: PayslipRoutes,
  },
  {
    path: "offer-letter-upload",
    element: <ExcelUploadWizard />,
    // children: PayslipRoutes,
  },
  {
    path: "experience-letter",
    element: <ExperienceLetterListPage />,
    // children: PayslipRoutes,
  },
  {
    path: "experience-letter-upload",
    element: <ExperienceLetterUploadPage />,
    // children: PayslipRoutes,
  },
  {
    path: "relieving-letter",
    element: <ReleaseLetterListPage />,
    // children: PayslipRoutes,
  },
  {
    path: "relieving-letter-upload",
    element: <ReleaseLetterUploadPage />,
    // children: PayslipRoutes,
  },
  {
    path: "exam-form-management",
    element: <ExamFormListPage />,
    // children: PayslipRoutes,
  },
  // {
  //   path: "candidate-exam",
  //   element: <CandidateExamList />,
  // },
  // {
  //   path: "release-letter",
  //   element: <EmployeeReleaseLetterList />,
  // },
  // {
  //   path: "experience-letter",
  //   element: <EmployeeExperienceLetterList />,
  // },
];

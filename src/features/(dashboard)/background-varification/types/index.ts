export enum offerLetterStatus {
  ALL = "all",
  DRAFT = "draft",
  SENT = "send",
  FAILED = "failed",
}

type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TReleaseLetterContextProps = {
  data: IOfferLetter[]; // replace with your actual data type
  isLoading: boolean;
  refresh: () => void;
};

export type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data: T;
};

export interface IOfferLetter {
  employeeName: string;
  employeeEmail: string;
  employeeAddress: string;
  employeeDesignation: string;
  employeeDateOfJoin: string;
  employeeCtc: string;
  companyLogo: string;
  companyName: string;
  companyAddress: string;
  offerLetterDate: string;
  companyContactName: string;
  companyPersonTitle: string;
  companyContactNumber: string;
  companyPersonalEmail: string;
  emailSubject: string;
  emailMessage: string;
  status: offerLetterStatus;
  generateByUser: string;
  createdAt: string;

  pan?: string;
  aadhar?: string;
  voter?: string;
  photo?: string;
  _id: string;
}

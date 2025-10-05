import type { DataTableRowAction } from "@/types";
import type { IOfferLetter } from "../types";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import FileUploader from "./FileUploader";
// Define document ID types
type DocumentId = "pan" | "aadhar" | "voter" | "photo";

// Define a structure for each document type
interface DocumentType {
  id: DocumentId;
  label: string;
  icon: React.ElementType;
  color: string;
}

// Structure for uploaded file
interface UploadedFile {
  file: File;
  name: string;
  size: string;
  preview: string | null;
}

// Main component
export default function UploadVerifyDocuments({
  rowAction,
  setRowAction,
}: {
  rowAction: DataTableRowAction<IOfferLetter> | null;
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<IOfferLetter> | null>
  >;
}) {

  return (
    <AlertDialog
      open={rowAction?.variant === "UPLOAD"}
      onOpenChange={() => {
        setRowAction(null);
      }}
    >
      <AlertDialogContent className="w-[900px] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>Upload & Verify Documents</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex gap-2">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-2  rounded-r-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="">
                <h3 className="text-lg font-semibold text-amber-800 mb-3">
                  Important Guidelines
                </h3>
                <ul className="text-amber-700 space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                    Upload only <strong>PNG or JPG</strong> image files (PDF not
                    supported)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                    Maximum file size: <strong>1MB per file</strong>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                    Experience documents can be:
                    <strong>
                      Release letter, Experience letter, Offer letter, or
                      Payslip
                    </strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full mx-auto p-6 space-y-3">
            {/* Compact List View */}

            <FileUploader
              userId={rowAction?.row?.original?._id as string}
              fileName="photo"
              key="photo"
              title="Employee image"
              uploadedUrl={rowAction?.row?.original?.photo}
            />
             <FileUploader
              userId={rowAction?.row?.original?._id as string}
              fileName="pan"
              key="pan"
              title="PAN Card"
              uploadedUrl={rowAction?.row?.original?.pan}
            />
            <FileUploader
              userId={rowAction?.row?.original?._id as string}
              fileName="aadharFront"
              key="aadharFront"
              title="Adhar Front"
              uploadedUrl={rowAction?.row?.original?.aadharFront}
            />
            <FileUploader
              userId={rowAction?.row?.original?._id as string}
              title="Adhar Back"
              fileName="aadharBack"
              key="aadharBack"
              uploadedUrl={rowAction?.row?.original?.aadharBack}
            />
            <FileUploader
              userId={rowAction?.row?.original?._id as string}
              fileName="education"
              key="education"
              title="Last education certificate"
              uploadedUrl={rowAction?.row?.original?.education}
            />
            <FileUploader
              userId={rowAction?.row?.original?._id as string}
              fileName="experience"
              key="experience"
              title="Last experience"
              uploadedUrl={rowAction?.row?.original?.experience}
            />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

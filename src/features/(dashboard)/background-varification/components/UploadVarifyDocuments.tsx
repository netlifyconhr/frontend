import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios-instance";
import type { DataTableRowAction } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Check, FileText, Image, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { IOfferLetter } from "../types";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  const [files, setFiles] = useState<Partial<Record<DocumentId, UploadedFile>>>(
    {}
  );
  const [dragOver, setDragOver] = useState<DocumentId | null>(null);
  const fileInputRefs = useRef<
    Partial<Record<DocumentId, HTMLInputElement | null>>
  >({});

  const documents: DocumentType[] = [
    { id: "pan", label: "PAN Card", icon: FileText, color: "blue" },
    { id: "aadhar", label: "Aadhar Card", icon: FileText, color: "green" },
    { id: "voter", label: "Voter ID", icon: FileText, color: "purple" },
    { id: "photo", label: "Photo", icon: Image, color: "orange" },
  ];

  const handleFile = (docId: DocumentId, file?: File) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File too large. Max 5MB allowed.");
      return;
    }

    const fileData: UploadedFile = {
      file,
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    };

    setFiles((prev) => ({ ...prev, [docId]: fileData }));
  };

  const removeFile = (docId: DocumentId) => {
    const fileToRemove = files[docId];
    if (fileToRemove?.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    setFiles((prev) => {
      const updated = { ...prev };
      delete updated[docId];
      return updated;
    });
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    docId: DocumentId
  ) => {
    e.preventDefault();
    setDragOver(null);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(docId, droppedFile);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    docId: DocumentId
  ) => {
    e.preventDefault();
    setDragOver(docId);
  };

  const handleDragLeave = () => {
    setDragOver(null);
  };

  const { mutate: uploadDocuments, isPending: uploading } = useMutation({
    mutationFn: (filesMap: Partial<Record<DocumentId, UploadedFile>>) => {
      const formData = new FormData();

      (Object.entries(filesMap) as [DocumentId, UploadedFile][]).forEach(
        ([docId, uploadedFile]) => {
          if (uploadedFile?.file) {
            formData.append(docId, uploadedFile.file); // field name = "pan", "aadhar", etc.
          }
        }
      );

      return axiosInstance.post(
        `/background-varification/upload-required-documents/${rowAction?.row?.original?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
  });
  const handleSubmit = () => {
    if (Object.keys(files).length === 4) {
      uploadDocuments(files);
    } else {
      toast.error("Please upload all documents.");
    }
  };
  const validFilesCount = Object.keys(files).length;

  return (
    <AlertDialog
      open={rowAction?.variant === "UPLOAD"}
      onOpenChange={() => {
        setRowAction(null);
      }}
    >
      <AlertDialogContent className="sm:max-w-[700px]  flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>Upload & Verify Documents</AlertDialogTitle>
          <AlertDialogDescription>
            Upload for {rowAction?.row?.original?.employeeName} verification
            documents. Accepted formats: PDF, PNG, JPG, DOCX (max 5MB each)
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="w-full mx-auto p-6">
          {/* Compact List View */}
          <div className="space-y-4">
            {documents.map((doc, index) => {
              const file = files[doc.id]; // File just uploaded in this session
              const IconComponent = doc.icon;
              const isUploaded = !!file;

              const existingFileUrl = rowAction?.row?.original?.[doc?.id];
              const isAlredayUpload = !!existingFileUrl;
              const isDragging = dragOver === doc.id;

              return (
                <div
                  key={doc.id}
                  className={`border-2 rounded-lg p-4 transition-all ${
                    isDragging
                      ? "border-blue-400 bg-blue-50"
                      : isUploaded || isAlredayUpload
                      ? `border-${doc.color}-200 bg-${doc.color}-50`
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDrop={(e) => !isAlredayUpload && handleDrop(e, doc.id)}
                  onDragOver={(e) =>
                    !isAlredayUpload && handleDragOver(e, doc.id)
                  }
                  onDragLeave={handleDragLeave}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-lg ${
                          isUploaded || isAlredayUpload
                            ? `bg-${doc.color}-100`
                            : "bg-gray-100"
                        }`}
                      >
                        <IconComponent
                          className={`h-6 w-6 ${
                            isUploaded || isAlredayUpload
                              ? `text-${doc.color}-600`
                              : "text-gray-500"
                          }`}
                        />
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900">
                          {doc.label}
                          {index < 2 && (
                            <span className="text-red-500"> *</span>
                          )}
                        </h3>

                        {isUploaded || isAlredayUpload ? (
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{file?.name || `${doc.id}.png`}</span>
                            {file?.size && (
                              <>
                                <span>•</span>
                                <span>{file.size}</span>
                              </>
                            )}
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">
                            Click to upload or drag & drop
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* Show preview only for image types */}
                      {(file?.preview || existingFileUrl) && (
                        <img
                          src={file?.preview || existingFileUrl}
                          alt="Preview"
                          className="h-12 w-12 object-cover rounded border"
                        />
                      )}

                      {!isAlredayUpload && isUploaded && (
                        <button
                          onClick={() => removeFile(doc.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}

                      {!isAlredayUpload && !isUploaded && (
                        <button
                          onClick={() => fileInputRefs.current[doc.id]?.click()}
                          className={`px-4 py-2 text-${doc.color}-600 border border-${doc.color}-600 rounded-lg hover:bg-${doc.color}-50 transition-colors text-sm font-medium`}
                        >
                          Upload
                        </button>
                      )}
                    </div>
                  </div>

                  {/* File input only if not already uploaded */}
                  {!isAlredayUpload && (
                    <input
                      ref={(el) => {
                        fileInputRefs.current[doc.id] = el;
                      }}
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf,.docx"
                      onChange={(e) => handleFile(doc.id, e.target.files?.[0])}
                      className="hidden"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="outline"
            onClick={() =>
              Object.keys(files).forEach((key) => removeFile(key as DocumentId))
            }
            disabled={validFilesCount === 0}
          >
            Clear All
          </Button>
          <Button
            variant="outline"
            onClick={handleSubmit}
            disabled={uploading || !!rowAction?.row?.original?.pan}
            className="gap-2"
          >
            Submits ({rowAction?.row?.original?.pan ? 4 : validFilesCount}/4)
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

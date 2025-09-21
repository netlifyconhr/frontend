import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { Image } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const FileUploader = ({
  userId,
  fileName,
  title,
  uploadedUrl,
}: {
  userId: string;
  fileName: string;
  title: string;
  uploadedUrl?: string;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<null | string>(
    uploadedUrl ?? null
  );

  const { mutate, isPending, isSuccess, reset } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append(fileName, file);

      return axiosInstance.post(
        `/background-varification/upload-required-documents/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    onSuccess: (data) => {
      setPreviewUrl(data?.data?.documents?.[fileName]);
      setSelectedFile(null);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];

    if (!file) return;

    const isValidType = ["image/png", "image/jpeg"].includes(file.type);
    const isValidSize = file.size <= MAX_FILE_SIZE;

    if (!isValidType) {
      toast.error("Only PNG or JPG files are allowed.");
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    if (!isValidSize) {
      toast.error("File size must be less than or equal to 1MB.");
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("No file selected.");
      return;
    }

    mutate(selectedFile);
  };

  const handleReupload = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full mx-auto  p-3 border border-gray-200 rounded-md shadow-sm bg-white">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          // onChange={e=>e.target.value}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
              cursor-pointer"
          hidden
        />

        <div className="flex items-center justify-between gap-x-4">
          <div
            className="flex gap-3 items-center"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Selected preview"
                className="h-[40px] w-auto object-cover rounded border"
              />
            ) : (
              <div className={"p-2 rounded-lg bg-green-100"}>
                <Image />
              </div>
            )}
            <div className="">
              <p className="text-sm text-gray-600 truncate max-w-[200px]">
                {title}
              </p>
              <p className="text-sm text-gray-500">
                Click to choose file or drag & drop
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {(isSuccess || selectedFile) && (
              <Button
                disabled={isPending}
                onClick={handleReupload}
                variant="destructive"
              >
                Remove
              </Button>
            )}
            {selectedFile && (
              <button
                onClick={handleUpload}
                disabled={isPending}
                className=" px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isPending ? "Uploading..." : "Upload"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;

import { handleSampleDownload } from "@/lib/utils";
import { DownloadCloud } from "lucide-react";
import { RELEASE_LETTER_EMPLYEES } from "../constants";

const ReleaseLetterHeader = () => {
  return (
    <div className="mb-8 flex justify-between">
      <div className="">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
          Release letter List
        </h1>
      </div>
      <div className="">
        <button
          onClick={() =>
            handleSampleDownload(
              RELEASE_LETTER_EMPLYEES,
              "sample_release_letter"
            )
          }
          className="px-4 cursor-pointer py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <DownloadCloud className="h-4 w-4" />
          Download sample Import
        </button>
      </div>
    </div>
  );
};

export default ReleaseLetterHeader;

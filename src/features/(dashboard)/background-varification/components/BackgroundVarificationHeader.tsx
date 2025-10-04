import Heading from "@/components/ui/Heading";
import { handleSampleDownload } from "@/lib/utils";
import { DownloadCloud } from "lucide-react";
import { VARIFICATION_EMPLYEES } from "../constants";

const BackgroundVarificationHeader = () => {
  return (
    <div className="md:mb-8 mb-2 flex justify-between flex-col md:flex-row">
      <div className="">
        <Heading>Background Varification</Heading>
      </div>
      <div className="">
        <button
          onClick={() =>
            handleSampleDownload(VARIFICATION_EMPLYEES, "sample_background_varification")
          }
          className="px-4 cursor-pointer py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 flex items-center gap-2 w-full md:text-sm text-xs"
        >
          <DownloadCloud className=" md:w-4 w-3.5" />
          Download sample Import
        </button>
      </div>
    </div>
  );
};

export default BackgroundVarificationHeader;

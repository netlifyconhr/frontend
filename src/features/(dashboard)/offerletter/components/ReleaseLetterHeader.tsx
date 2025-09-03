import { handleSampleDownload } from "@/lib/utils";
import { DownloadCloud } from "lucide-react";
import { RELEASE_LETTER_EMPLYEES } from "../constants";
import Heading from "@/components/ui/Heading";

const ReleaseLetterHeader = () => {
  return (
    <div className="md:mb-8 mb-2 flex justify-between flex-col md:flex-row">
      <div className="">
        <Heading>Offer letter List</Heading>
      </div>
      <div className="">
        <button
          onClick={() =>
            handleSampleDownload(RELEASE_LETTER_EMPLYEES, "sample_offer_letter")
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

export default ReleaseLetterHeader;

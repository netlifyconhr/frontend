export default function ReleaseLetterListLoader() {
  return (
    <tr className="hover:bg-gray-50 transition-colors animate-pulse">
      {/* Select Checkbox */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="w-4 h-4 bg-gray-300 rounded"></div>
      </td>

      {/* Candidate Name */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-red-300 to-blue-300"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </td>

      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </td>

      {/* Date of Join */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex gap-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>
      </td>
    </tr>
  );
}

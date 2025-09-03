import Heading from "@/components/ui/Heading";
import {
  ArrowUpDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  Eye,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

const ExperienceList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState([
    { id: 1, type: "Status", value: "Active", color: "blue" },
    { id: 2, type: "Date", value: "Last 30 days", color: "green" },
  ]);

  // Sample data
  const sampleData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      status: "Active",
      role: "Software Engineer",
      dateCreated: "2024-01-15",
      avatar: "JD",
      avatarColor: "from-red-300 to-blue-300",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "Pending",
      role: "Product Manager",
      dateCreated: "2024-01-20",
      avatar: "JS",
      avatarColor: "from-blue-300 to-green-300",
    },
    {
      id: 3,
      name: "Mike Brown",
      email: "mike.brown@example.com",
      status: "Inactive",
      role: "Designer",
      dateCreated: "2024-01-10",
      avatar: "MB",
      avatarColor: "from-green-300 to-red-300",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      status: "Active",
      role: "Data Analyst",
      dateCreated: "2024-01-25",
      avatar: "SW",
      avatarColor: "from-red-300 to-green-300",
    },
    {
      id: 5,
      name: "Tom Johnson",
      email: "tom.johnson@example.com",
      status: "Pending",
      role: "Developer",
      dateCreated: "2024-01-18",
      avatar: "TJ",
      avatarColor: "from-blue-300 to-red-300",
    },
  ];

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    const filtered = sampleData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDateRange =
        (!dateFrom || item.dateCreated >= dateFrom) &&
        (!dateTo || item.dateCreated <= dateTo);

      return matchesSearch && matchesDateRange;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];

        if (typeof aVal === "string") {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }

        if (sortDirection === "asc") {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        } else {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [sampleData, searchTerm, dateFrom, dateTo, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectItem = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === paginatedData.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(paginatedData.map((item) => item.id)));
    }
  };

  const removeFilter = (filterId) => {
    setActiveFilters(activeFilters.filter((f) => f.id !== filterId));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchTerm("");
    setDateFrom("");
    setDateTo("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const SkeletonRow = () => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-8 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-300 to-blue-300 animate-pulse"></div>
          <div className="space-y-2">
            <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-16 h-3 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="w-16 h-6 bg-gray-300 rounded-full animate-pulse"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Heading>Experience letter List</Heading>
          <p className="text-gray-600 mt-2">
            Manage your data with advanced filtering and sorting capabilities
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Table Header Controls */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search and Date Filters */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block text-xs md:text-sm w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Date Range Filters */}
                <div className="flex gap-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 flex items-center gap-2 cursor-pointer  text-xs md:text-sm">
                  <Download className=" md:w-4 w-3.5" />
                  Import
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center gap-2">
                  <Upload className=" md:w-4 w-3.5" />
                  Export
                </button>
              </div>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {activeFilters.map((filter) => (
                <span
                  key={filter.id}
                  className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                    filter.color === "blue"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {filter.type}: {filter.value}
                  <X
                    className="h-3 w-3 cursor-pointer hover:opacity-70"
                    onClick={() => removeFilter(filter.id)}
                  />
                </span>
              ))}
              {activeFilters.length > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-all"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-red-100 to-green-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={
                          selectedItems.size === paginatedData.length &&
                          paginatedData.length > 0
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span
                        className="cursor-pointer hover:text-gray-700 flex items-center gap-1"
                        onClick={() => handleSort("id")}
                      >
                        ID
                        <ArrowUpDown className="h-4 w-4" />
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div
                      className="flex items-center gap-2 cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort("name")}
                    >
                      <span>Name</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div
                      className="flex items-center gap-2 cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort("email")}
                    >
                      <span>Email</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div
                      className="flex items-center gap-2 cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort("status")}
                    >
                      <span>Status</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div
                      className="flex items-center gap-2 cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort("dateCreated")}
                    >
                      <span>Date Created</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading
                  ? // Show skeleton loading
                    Array.from({ length: 3 }).map((_, index) => (
                      <SkeletonRow key={index} />
                    ))
                  : paginatedData.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedItems.has(item.id)}
                              onChange={() => handleSelectItem(item.id)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-900">
                              #{item.id.toString().padStart(3, "0")}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full bg-gradient-to-r ${item.avatarColor} flex items-center justify-center`}
                            >
                              <span className="text-white font-medium">
                                {item.avatar}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {item.role}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.dateCreated}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button className="text-blue-600 hover:text-blue-900 transition-colors">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900 transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Results Info */}
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      startIndex + itemsPerPage,
                      filteredAndSortedData.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {filteredAndSortedData.length}
                  </span>{" "}
                  results
                </div>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                  <option value={100}>100 per page</option>
                </select>
              </div>

              {/* Pagination */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded-md text-sm transition-all ${
                        currentPage === pageNum
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                          : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {totalPages > 5 && (
                  <>
                    <span className="px-2 text-gray-500">...</span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions Panel */}
        {selectedItems.size > 0 && (
          <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {selectedItems.size} items selected
                </span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md text-sm hover:from-red-600 hover:to-red-700 transition-all">
                    Delete Selected
                  </button>
                  <button className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md text-sm hover:from-green-600 hover:to-green-700 transition-all">
                    Export Selected
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
                    Mark as Active
                  </button>
                </div>
              </div>
              <button
                onClick={() => setSelectedItems(new Set())}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceList;

import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import { AlertCircle, CheckCircle, Clock, Send, X } from "lucide-react";

interface BulkProcessStatus {
  processId: string;
  total: number;
  sent: number;
  failed: number;
  pending: number;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  completedEmails: string[];
  failedEmails: string[];
}

interface OfferLetter {
  employeeEmail: string;
  employeeName: string;
  position: string;
  salary: number;
  startDate: string;
}

const BulkOfferLetterComponent = () => {
  const [socket, setSocket] = useState(null);
  const [offerLetters, setOfferLetters] = useState([
    {
      employeeEmail: "john@example.com",
      employeeName: "John Doe",
      position: "Software Engineer",
      salary: 75000,
      startDate: "2024-08-01",
    },
    {
      employeeEmail: "jane@example.com",
      employeeName: "Jane Smith",
      position: "Product Manager",
      salary: 85000,
      startDate: "2024-08-01",
    },
    {
      employeeEmail: "bob@example.com",
      employeeName: "Bob Johnson",
      position: "UI Designer",
      salary: 70000,
      startDate: "2024-08-01",
    },
  ]);
  const [processStatus, setProcessStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(
      import.meta.env.VITE_BASE_URL || "http://localhost:3001"
    );
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("process-update", (status) => {
      console.log("Process update:", status);
      setProcessStatus(status);
    });

    socket.on("process-complete", (status) => {
      console.log("Process complete:", status);
      setProcessStatus(status);
      setIsProcessing(false);
    });

    return () => {
      socket.off("process-update");
      socket.off("process-complete");
    };
  }, [socket]);

  const handleStartBulkProcess = async () => {
    try {
      setIsProcessing(true);
      setProcessStatus(null);

      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL || "http://localhost:3001"
        }/api/offer-letters/bulk-offer-letters`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT token
          },
          body: JSON.stringify({
            offerLetters,
          }),
        }
      );

      const data = await response.json();

      if (data.success && socket) {
        // Join the process room to receive updates
        socket.emit("join-process", data.processId);

        // Initialize status
        setProcessStatus({
          processId: data.processId,
          total: offerLetters.length,
          sent: 0,
          failed: 0,
          pending: offerLetters.length,
          status: "PENDING",
          completedEmails: [],
          failedEmails: [],
        });
      } else {
        throw new Error(data.message || "Failed to start process");
      }
    } catch (error) {
      console.error("Error starting bulk process:", error);
      setIsProcessing(false);
      alert("Failed to start bulk offer letter process");
    }
  };

  const addOfferLetter = () => {
    setOfferLetters([
      ...offerLetters,
      {
        employeeEmail: "",
        employeeName: "",
        position: "",
        salary: 0,
        startDate: "",
      },
    ]);
  };

  const updateOfferLetter = (index, field, value) => {
    const updated = [...offerLetters];
    updated[index] = { ...updated[index], [field]: value };
    setOfferLetters(updated);
  };

  const removeOfferLetter = (index) => {
    setOfferLetters(offerLetters.filter((_, i) => i !== index));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-600";
      case "PROCESSING":
        return "text-blue-600";
      case "COMPLETED":
        return "text-green-600";
      case "FAILED":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getProgressPercentage = () => {
    if (!processStatus) return 0;
    return (
      ((processStatus.sent + processStatus.failed) / processStatus.total) * 100
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Bulk Offer Letter Generator
        </h1>

        {/* Offer Letters Input */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">
              Offer Letters ({offerLetters.length})
            </h2>
            <button
              onClick={addOfferLetter}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              disabled={isProcessing}
            >
              Add Offer Letter
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {offerLetters.map((letter, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                  <input
                    type="email"
                    placeholder="Email"
                    value={letter.employeeEmail}
                    onChange={(e) =>
                      updateOfferLetter(index, "employeeEmail", e.target.value)
                    }
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isProcessing}
                  />
                  <input
                    type="text"
                    placeholder="Name"
                    value={letter.employeeName}
                    onChange={(e) =>
                      updateOfferLetter(index, "employeeName", e.target.value)
                    }
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isProcessing}
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={letter.position}
                    onChange={(e) =>
                      updateOfferLetter(index, "position", e.target.value)
                    }
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isProcessing}
                  />
                  <input
                    type="number"
                    placeholder="Salary"
                    value={letter.salary}
                    onChange={(e) =>
                      updateOfferLetter(index, "salary", Number(e.target.value))
                    }
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isProcessing}
                  />
                  <button
                    onClick={() => removeOfferLetter(index)}
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
                    disabled={isProcessing}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Start Process Button */}
        <div className="mt-6">
          <button
            onClick={handleStartBulkProcess}
            disabled={isProcessing || offerLetters.length === 0}
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send size={20} />
            {isProcessing
              ? "Processing..."
              : `Send ${offerLetters.length} Offer Letters`}
          </button>
        </div>
      </div>

      {/* Progress Status */}
      {processStatus && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Process Status
            </h2>
            <span
              className={`font-medium ${getStatusColor(processStatus.status)}`}
            >
              {processStatus.status}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{Math.round(getProgressPercentage())}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-gray-50 p-3 rounded-md text-center">
              <div className="text-2xl font-bold text-gray-700">
                {processStatus.total}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-green-50 p-3 rounded-md text-center">
              <div className="text-2xl font-bold text-green-700 flex items-center justify-center gap-1">
                <CheckCircle size={20} />
                {processStatus.sent}
              </div>
              <div className="text-sm text-green-600">Sent</div>
            </div>
            <div className="bg-red-50 p-3 rounded-md text-center">
              <div className="text-2xl font-bold text-red-700 flex items-center justify-center gap-1">
                <AlertCircle size={20} />
                {processStatus.failed}
              </div>
              <div className="text-sm text-red-600">Failed</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-md text-center">
              <div className="text-2xl font-bold text-yellow-700 flex items-center justify-center gap-1">
                <Clock size={20} />
                {processStatus.pending}
              </div>
              <div className="text-sm text-yellow-600">Pending</div>
            </div>
          </div>

          {/* Details Toggle */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>

          {/* Email Details */}
          {showDetails && (
            <div className="mt-4 space-y-4">
              {processStatus.completedEmails.length > 0 && (
                <div>
                  <h3 className="font-medium text-green-700 mb-2">
                    ✅ Successfully Sent:
                  </h3>
                  <div className="bg-green-50 p-3 rounded-md">
                    {processStatus.completedEmails.map((email, i) => (
                      <div key={i} className="text-sm text-green-800">
                        {email}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {processStatus.failedEmails.length > 0 && (
                <div>
                  <h3 className="font-medium text-red-700 mb-2">
                    ❌ Failed to Send:
                  </h3>
                  <div className="bg-red-50 p-3 rounded-md">
                    {processStatus.failedEmails.map((email, i) => (
                      <div key={i} className="text-sm text-red-800">
                        {email}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BulkOfferLetterComponent;

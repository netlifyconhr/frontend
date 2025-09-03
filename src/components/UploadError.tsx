import { AlertTriangle, Phone, RefreshCw, Settings } from 'lucide-react';
import { useState } from 'react';

export default function UploadError() {
  const [showDetails, setShowDetails] = useState(false);


  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
   

      {/* Main Error Container */}
      <div className={`relative max-w-lg w-full transition-all duration-1000  opacity-100 translate-y-0' `}>
        
        {/* Error Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-red-100 overflow-hidden">
          
          {/* Header with animated icon */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-center relative">
            <div className="absolute inset-0 bg-black/5"></div>
            
            {/* Animated Error Icon */}
            <div className="relative z-10 mb-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full animate-bounce">
                <AlertTriangle className="w-10 h-10 text-white animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">System Error</h1>
            
            {/* Decorative wave */}
            <div className="absolute bottom-0 left-0 w-full">
              <svg className="w-full h-6" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,20 Q25,0 50,10 T100,5 L100,20 Z" fill="white" fillOpacity="0.1">
                  <animate attributeName="d" dur="4s" repeatCount="indefinite" 
                    values="M0,20 Q25,0 50,10 T100,5 L100,20 Z;M0,20 Q25,15 50,5 T100,15 L100,20 Z;M0,20 Q25,0 50,10 T100,5 L100,20 Z"/>
                </path>
              </svg>
            </div>
          </div>

          {/* Error Message Content */}
          <div className="p-8 space-y-6">
            
            {/* Main Error Message */}
            <div className="text-center space-y-3">
             
              
              <h2 className="text-xl font-semibold text-gray-800">
                Failed to Send Offer Letters
              </h2>
              
              <p className="text-gray-600 leading-relaxed">
                Invalid email credentials detected. The system cannot process email communications at this time.
              </p>
            </div>

            {/* Error Details Toggle */}
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                <span className="text-sm font-medium text-gray-700">Error Details</span>
                <div className={`transform transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                showDetails ? 'max-h-32 opacity-100 mt-3' : 'max-h-0 opacity-0'
              }`}>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Settings className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Error Code</p>
                      <p className="text-sm text-red-700 font-mono mt-1">Invalid Gmail Configuration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Message */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Action Required</p>
                  <p className="text-sm text-orange-700 mt-1">
                    Please contact the system administrator to resolve the email configuration issue.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button 
                onClick={() => window.location.reload()}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </button>
              
              <button 
                onClick={() => window.location.reload()}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>

      
      </div>

    
    </div>
  );
}
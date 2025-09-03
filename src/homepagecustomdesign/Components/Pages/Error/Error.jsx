import React from "react";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-center p-4">
      <div className="max-w-md ">
        <img 
          src="src/assets/only_logo_404-removebg-preview.png"
          alt="NetlifyCon Logo"
          className="w-32 mx-auto mb-6"
        />
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-500 mt-2 mb-6">
          Oops! The page you're looking for doesn't exist.  
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

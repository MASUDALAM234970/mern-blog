import React from "react";

export default function NoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <img
        src="https://via.placeholder.com/400x300.png?text=404+Error" // Replace with a beautiful 404 image URL
        alt="404 Illustration"
        className="w-80 mb-6 rounded-lg shadow-lg"
      />
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6 text-center">
        Oops! The page you're looking for doesn't exist or might have been
        moved.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition duration-300"
      >
        Go Back Home
      </a>
    </div>
  );
}

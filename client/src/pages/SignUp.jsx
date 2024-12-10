import React from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="">{/* left */}</div>
      <div>
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
          tes
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Alam's
          </span>
          Blog
        </Link>
      </div>
      <div className="">{/* Right*/}</div>
    </div>
  );
};

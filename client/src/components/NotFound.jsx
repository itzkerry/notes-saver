import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // shadcn button

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-sky-100 dark:bg-gray-900 text-center px-4">
      <h1 className="text-6xl font-bold text-sky-600 dark:text-white mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-sky-800 dark:text-gray-200 mb-2">
        Oops! Page not found.
      </h2>
      <p className="text-sky-700 dark:text-gray-400 max-w-xl mb-6">
        The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Link to="/">
        <Button variant="outline" className="text-sky-700 border-sky-300 hover:bg-sky-200 dark:hover:bg-gray-800">
          Go Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;

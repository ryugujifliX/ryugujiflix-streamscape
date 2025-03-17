
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-ryugu-dark p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-ryugu-red animate-pulse-slow">404</h1>
        <p className="text-2xl font-semibold mb-4">Page Not Found</p>
        <p className="text-white/70 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg mb-8">
          <p className="text-white/60 text-sm">
            <span className="text-ryugu-red">Error:</span> Could not locate{' '}
            <span className="px-2 py-1 bg-white/10 rounded-md font-mono text-xs">
              {location.pathname}
            </span>
          </p>
        </div>
        <Link
          to="/"
          className="ryugu-button inline-flex"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

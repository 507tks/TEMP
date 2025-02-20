import React from 'react'

function NotAuthorisedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 Forbidden</h1>
      <p className="text-lg text-gray-700 mb-6">You do not have permission to access this page.</p>
     
    </div>
  );
}

export default NotAuthorisedPage
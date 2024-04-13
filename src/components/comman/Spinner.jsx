import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <div
        className="w-10 h-10 ring-offset-1 ring-2 border-8 border-transparent rounded-full animate-spin"
        style={{
          borderTopColor: "#4A90E2",
          borderRightColor: "#F5A623",
          borderBottomColor: "#F8E71C",
          borderLeftColor: "#D0021B",
        }}
      ></div>

      <span className="text-sm">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;

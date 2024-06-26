import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ShareComponent = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    // Get the current URL
    const currentUrl = window.location.href;
    setUrl(currentUrl);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copied to clipboard");
    } catch (error) {
      console.error("Failed to copy URL to clipboard", error);
      toast.error("Failed to copy URL to clipboard");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={copyToClipboard}
        className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded"
        aria-label="Copy URL to clipboard"
      >
        Share
      </button>
      {/* Uncomment this if you want to show the URL */}
      {/* <span className="text-gray-500">{url}</span> */}
    </div>
  );
};

export default ShareComponent;

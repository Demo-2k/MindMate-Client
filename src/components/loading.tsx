import React from "react";

const Loader = () => {
  return (

    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
      <div className="flex space-x-2">
        <div className="w-6 h-6 bg-yellow-300 rounded-full animate-bounce"></div>
        <div className="w-6 h-6 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-6 h-6 bg-yellow-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
      </div>
    </div>
  );
};

export default Loader;

import React from "react";

export const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[35vh] mb-4 px-4 overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 text-center space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm text-emerald-700 rounded-full text-sm font-semibold border border-emerald-200/50 shadow-sm animate-in fade-in-0 slide-in-from-top-4 duration-700">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          Welcome to the Future of E-commerce
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight bg-clip-text text-emerald-500 leading-tight animate-in fade-in-0 slide-in-from-bottom-6 duration-1000 delay-200">
          Konimbo
          <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mt-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-500">
            Landing Page
          </span>
        </h1>
      </div>
    </div>
  );
};

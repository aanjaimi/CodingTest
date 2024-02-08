import React from "react";
import { GoSearch } from "react-icons/go";

const SearchBar = () => {
  return (
    <div className="relative mx-[20px] mt-[10px] lg:flex hidden items-center">
      <input
        type="text"
        placeholder="Search"
        className="lg:w-[320px] lg:h-[40px] pl-10 pr-4 py-2 bg-slate-200 focus:bg-white border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-300"
      />
      <div className="absolute left-4 top-3">
        <GoSearch className="h-4 w-4 text-gray-500" />
      </div>
    </div>
  );
};

export default SearchBar;

import React from "react";
import { GoSearch } from "react-icons/go";

type SearchBarProps = {
  width?: string;
  height?: string;
  position?: string;
};

const SearchBar = ({ width, height, position }: SearchBarProps) => {
  return (
    <div className={`w-full relative mx-[20px] mt-[10px] flex items-center ${position}`}>
      <input
        type="text"
        placeholder="Search"
        className={`${width} ${height} pl-10 pr-4 py-2 bg-slate-200 focus:bg-white border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-300`}
      />
      <div className={`absolute left-4 top-3 ${position}`}>
        <GoSearch className="h-4 w-4 text-gray-500" />
      </div>
    </div>
  );
};

export default SearchBar;

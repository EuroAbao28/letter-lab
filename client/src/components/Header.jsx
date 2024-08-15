import React from "react";
import { LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Header({ children, title }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2 pb-4 border-b border-customMidGray">
      <div
        onClick={() => navigate("/")}
        className="p-2 text-lg transition-all rounded-full cursor-pointer hover:bg-customMidGray active:scale-95">
        <FaArrowLeft />
      </div>
      <h1 className="px-4 py-2 text-xl font-semibold capitalize rounded-lg shadow-customShadow outline outline-2 outline-black bg-slate-200 text-nowrap">
        {title}
      </h1>
      {children}
    </div>
  );
}

export default Header;

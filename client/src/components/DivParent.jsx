import React from "react";
import bricks from "../assets/confetti.svg";

function DivParent({ children }) {
  return (
    <div className="relative flex items-center justify-center w-screen h-svh text-slate-900">
      <img
        className="absolute object-cover w-full h-full -z-50"
        src={bricks}
        alt=""
      />
      {children}
    </div>
  );
}

export default DivParent;

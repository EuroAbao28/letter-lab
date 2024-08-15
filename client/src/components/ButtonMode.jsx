import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

function ButtonMode({ children, bgColor, link }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/${link}`)}
      className={classNames(
        "py-3 rounded-full flex-1 font-bold shadow-customShadow transition-all active:scale-95 active:shadow outline outline-2 outline-black",
        bgColor
      )}>
      {children}
    </button>
  );
}

export default ButtonMode;

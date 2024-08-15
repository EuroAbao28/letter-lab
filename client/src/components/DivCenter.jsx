import React, { useEffect } from "react";
import classNames from "classnames";
import AOS from "aos";
import "aos/dist/aos.css";
import CornerNails from "./CornerNails";

function DivCenter({ children, width }) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      data-aos="fade-down"
      className={classNames(
        "p-6 bg-customLightGray outline-2 outline-black outline relative shadow-customShadow rounded-2xl mx-4",
        width
      )}>
      {children}

      <CornerNails />
    </div>
  );
}

export default DivCenter;

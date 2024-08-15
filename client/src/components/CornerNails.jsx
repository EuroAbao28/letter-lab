import React from "react";

function CornerNails() {
  return (
    <>
      <div className="absolute w-2 rounded-full shadow-customShadow outline outline-1 outline-customDarkGray bg-customMidGray aspect-square top-4 left-4"></div>

      <div className="absolute w-2 rounded-full shadow-customShadow outline outline-1 outline-customDarkGray bg-customMidGray aspect-square top-4 right-4"></div>

      <div className="absolute w-2 rounded-full shadow-customShadow outline outline-1 outline-customDarkGray bg-customMidGray aspect-square bottom-4 left-4"></div>

      <div className="absolute w-2 rounded-full shadow-customShadow outline outline-1 outline-customDarkGray bg-customMidGray aspect-square bottom-4 right-4"></div>
    </>
  );
}

export default CornerNails;

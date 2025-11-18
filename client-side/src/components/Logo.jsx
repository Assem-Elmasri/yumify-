import React from "react";

const Logo = ({
  logoColor = "text-prim",
  logoSize = "text-[45px]",
  logoMargin = "m-[20px]",
}) => {
  return (
    <div
      className={` ${logoSize} ${logoColor} font-logofont text-center ${logoMargin}`}
    >
      Yumify
    </div>
  );
};

export default Logo;

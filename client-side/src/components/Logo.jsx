import React from "react";

const Logo = ({
  logoColor = "text-prim",
  logoSize = "text-[45px]",
  logoMargin = "m-[20px]",
  classname = "text-[50px]",
}) => {
  return (
    <div
      className={` ${logoSize} ${logoColor} font-logofont text-center ${logoMargin} sm:${classname}`}
    >
      Yumify
    </div>
  );
};

export default Logo;

import React from "react";

const MenuItem = ({ title, price, tags }) => {
  return (
    <div className="flex flex-col mb-12  w-full ">
      <div className="flex items-center justify-between space-x-5 mb-2  ">
        <p className="text-color_golden font-cormorant text-2xl lg:mr-10 font-bold flex-1  ">
          {title}
        </p>

        <div className="w-[70px] h-[1px] bg-color_white " />

        <p className="text-lg font-cormorant text-color_white">{price}</p>
      </div>

      <div>
        <p className="text-color_grey">{tags}</p>
      </div>
    </div>
  );
};
export default MenuItem;

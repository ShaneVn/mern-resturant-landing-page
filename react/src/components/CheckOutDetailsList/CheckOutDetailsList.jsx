import React from "react";

function CheckOutDetailsList({ category, info }) {
  return (
    <div className=" flex justify-between w-full ">
      <h1 className="w-[75%] sm:w-[80%]">{category}</h1>
      <h1 className="mr-auto">{info}</h1>
    </div>


  );
}

export default CheckOutDetailsList;

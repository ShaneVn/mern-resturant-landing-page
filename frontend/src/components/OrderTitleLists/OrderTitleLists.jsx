import React from "react";

function OrderTitleLists({ category, active, setSearchParams, updatedSearchParams, menu}) {
  return (
    <div>
      <li  className={ `py-2  ${active && "text-white duration-200 ease-in" }`}
      onClick={()=>{
        updatedSearchParams.set(menu, category)
        setSearchParams(updatedSearchParams.toString());
      }}>{category}</li>
      
    </div>
  );
}

export default OrderTitleLists;

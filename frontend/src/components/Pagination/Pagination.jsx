import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Pagination({
  orderPerPage,
  totalOrders,
  setCurrentPage,
  currentPage,
}) {
  const numberOfPages = [];
  const navigate = useNavigate();
  const { id } = useParams();

  for (let i = 1; i <= Math.ceil(totalOrders / orderPerPage); i++) {
    numberOfPages.push(i);
  }

  useEffect(()=>{
    setCurrentPage(id)
  },[])

  const handleClick = (num) => {
    setCurrentPage(num)
    navigate(`/orderhistory/${num}`)
    
  };

 

  return (
    <div>
      <ul className="flex__center mt-10">
        {numberOfPages.map((num) => (
          <li
            key={num}
            className={`mr-4 text-color_black 
           text-xl cursor-pointer nav-hover  ${
             id == num && "border-2 px-3 py-1 border-color_gray rounded-md "
           }`}
            onClick={() => handleClick(num)}
          >
            {num}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;

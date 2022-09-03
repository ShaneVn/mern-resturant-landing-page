import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./Pagination.css"


function Pagination({
  orderPerPage,
  totalOrders,
  setCurrentPage,
  currentPage,
  setItemOffset,
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

  const handleClick = (event) => {
    const newOffset = (event.selected * orderPerPage) % numberOfPages.length;
    console.log(event.selected)
    setItemOffset(newOffset);
    
  };


  
 

  return (
    <div className="mt-12">
      {/* <ul className="flex__center mt-10">
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
      </ul> */}

<ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={numberOfPages.length}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handleClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Pagination;

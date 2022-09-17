import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import "./Pagination.css";

function Pagination({
  orderPerPage,
  totalOrders,
  setCurrentPage,
  currentPage,
  setItemOffset,
}) {
  // set the total numbers based on how much orders are pulling from database
  let numberOfPages = [];

  for (let i = 1; i <= Math.ceil(totalOrders / orderPerPage); i++) {
    numberOfPages.push(i);
  }

  // logic for showing what pages should be shown on the screen in different situations
  let pageRange = [];
  if (numberOfPages.length <= 5) {
    for (let i = 1; i <= numberOfPages.length; i++) {
      pageRange.push(i);
    }
  } else if (numberOfPages.length > 5 && parseInt(currentPage) < 5) {
    for (let i = 1; i <= 5; i++) {
      pageRange.push(i);
    }
  } else if (parseInt(currentPage) + 4 > numberOfPages.length) {
    for (let i = numberOfPages.length - 4; i <= numberOfPages.length; i++) {
      pageRange.push(i);
    }
  } else {
    pageRange = [
      parseInt(currentPage) - 1,
      parseInt(currentPage),
      parseInt(currentPage) + 1,
    ];
  }

  // handle click when you click on a specific page
  const handleClick = (page) => {
    const newOffset = (page - 1) * orderPerPage;
    setCurrentPage({ __page: page });

    setItemOffset(newOffset);
  };

  // handle click when you click on the first page
  const handleFirstPage = () => {
    setCurrentPage({ __page: 1 });
    setItemOffset(0);
  };


  // handle click when you click on the last page
  const handleLastPage = () => {
    setCurrentPage({ __page: numberOfPages.length });
    setItemOffset((numberOfPages.length - 1) * orderPerPage);
  };


  // handle click when you click on the previous button
  const handlePreviousClick = () => {
    const previousPageInNumber = parseInt(currentPage) -1
  
    setCurrentPage({ __page: previousPageInNumber})
    setItemOffset((previousPageInNumber -1) * orderPerPage);

  }

// handle click when you click on the next button
  const handleNextClick = () => {
    const nextPageInNumber = parseInt(currentPage) +1
    
    setCurrentPage({ __page: nextPageInNumber})
    setItemOffset((nextPageInNumber -1 ) * orderPerPage);

  }

 
  //  show pages based on page range
  const pageNumbers = pageRange?.map((page) => {
    if (numberOfPages.length > 0) {
      return (
        <ul
          key={page}
          id={page}
          onClick={() => handleClick(page)}
          className={`m-5 nav-hover ${
            parseInt(currentPage) === page
              ? "border-[1px] border-color_golden px-4 py-2 rounded-md "
              : null
          }`}
        >
          {page}
        </ul>
      );
    } else {
      return null;
    }
  });

  // when to show the last page and the dots
  let pageIncrementEllipses = null;
  if (
    (numberOfPages.length >= 6 &&
      parseInt(currentPage) + 4 <= numberOfPages.length) ||
    (numberOfPages.length >= 6 &&
      (parseInt(currentPage) === 4 || parseInt(currentPage) === 3))
  ) {
    pageIncrementEllipses = (
      <div className="flex">
        {numberOfPages.length > 6 && (
          <ul className="mr-6">&hellip;</ul>
        )}

        <ul onClick={handleLastPage} className="cursor-pointer nav-hover ">
          {numberOfPages.length}
        </ul>
      </div>
    );
  }

  // when to show the first page and the dots

  let pageDecremenEllipses = null;
  if (parseInt(currentPage) >= 5) {
    pageDecremenEllipses = (
      <div className="flex mr-5">
        <ul onClick={handleFirstPage} className="cursor-pointer nav-hover">
          1
        </ul>
        {parseInt(currentPage) >= 5 && numberOfPages.length > 6 && (
          <ul className="ml-7">&hellip;</ul>
        )}
      </div>
    );
  }


  return (
    <div className="flex justify-center items-center mt-12 space-x-12 ">
     { <button
      disabled = {parseInt(currentPage) < 2}
      onClick={handlePreviousClick}
      className=" border-[1px] border-color_black rounded-md px-5 py-2 nav-hover">
        Prev
      </button> }
      {pageDecremenEllipses}
      {pageNumbers}
      {pageIncrementEllipses}
      <button
      disabled = {parseInt(currentPage) === numberOfPages.length}
      onClick={handleNextClick }
      className=" border-[1px] border-color_black rounded-md px-5 py-2 nav-hover">
        Next
      </button>
    </div>
  );
}

export default Pagination;

/* <ReactPaginate
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
        currentPage={6}
      /> */

import React, { useState } from "react";
import {  Link } from "react-router-dom";


function DropDown() {
  const [active, setActive] = useState(false);

  console.log(active);

  return (
    <div className="relative inline-block text-left text-[#B2BECD] font-openSans">
      <div onClick={() => setActive((prev) => !prev)}>
        <button
          type="button"
          className="inline-flex w-full justify-center 
    
      bg-[#2a2e35] px-4 py-2 font-medium  shadow-sm nav-hover "
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Need Help?
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={`${
          active ? "flex" : "hidden"
        } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#2a2e35] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
      >
        <div className="py-1" role="none">
          <Link className=" block px-4 py-2  nav-hover" to = {"/resetpassword"}>
            Password Reset
          </Link>

          <Link className=" block w-full px-4 py-2 text-left nav-hover" to ={"/resendactivation"}>
            Resend Activation Email
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DropDown;

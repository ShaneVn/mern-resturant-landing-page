import React from "react";

function Button({ text, section }) {
  return (
    <div className="">
      <a
        href={section && `#${section}`}
        className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group cursor-pointer"
      >
        <span className="w-48 h-48 rounded rotate-[-40deg] bg-color_golden absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
        <span className="relative w-full text-left text-color_black font-bold font-cormorant text-lg transition-colors duration-300 ease-in-out group-hover:text-white">
          {text}
        </span>
      </a>
    </div>
  );
}

export default Button;

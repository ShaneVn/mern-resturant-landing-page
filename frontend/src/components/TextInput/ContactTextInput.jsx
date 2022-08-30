import React from "react";

function ContactTextInput({ placeholder, setInPutValue, email }) {
  return (
    <div className=" w-full xl:mr-10 mb-5 xl:mb-0  rounded-[5px] overflow-hidden text-lg ">
      <input
        type={email ? "email" : "text"}
        placeholder={placeholder}
        className="app__bg outline-none text-color_white p-4 caret-white font-cormorant 
        w-full  border-[1.5px] border-color_gray rounded-[5px]
        focus:border-color_golden "
        required
        onChange={(e) => setInPutValue(e.target.value)}
      />
    </div>
  );
}

export default ContactTextInput;

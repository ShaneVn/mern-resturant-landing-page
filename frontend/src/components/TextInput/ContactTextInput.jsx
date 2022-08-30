import React from "react";

function ContactTextInput({ placeholder }) {
  return (
    <div className=" border-[1px] w-full xl:mr-10 mb-5 xl:mb-0 border-color_gray rounded-[5px] overflow-hidden text-lg ">
      <input
        type="text"
        placeholder={placeholder}
        className="app__bg outline-none text-color_white p-4 caret-white font-cormorant w-full "
        required
      />
    </div>
  );
}

export default ContactTextInput

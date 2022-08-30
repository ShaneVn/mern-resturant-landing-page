import React from 'react'

function PaymentTextInput({placeholder, setInPutValue ,email}) {
  return (
    <div className="  w-full 2xl:w-[45%] xl:mr-10 mb-10 xl:mb-[3.5rem] 
    rounded-[5px] overflow-hidden ">
            <input
              type= { email ? "email" : "text"}
              placeholder={placeholder}
              className="app__bg outline-none text-color_white
               p-4 caret-white w-full font-openSans border-[1.5px] border-color_gray
                focus:border-color_golden rounded-[5px] "
              required
              onChange={(e)=>setInPutValue(e.target.value)}
            />
          </div>
  )
}

export default PaymentTextInput
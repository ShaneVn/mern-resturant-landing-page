import React, { useState } from "react";
import { HiOutlineArrowNarrowLeft, HiOutlineMail } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";
import displayError from "../../utils/displayError";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRecoilState } from "recoil";
import {  loadingState } from "../../atoms/atoms";
import { useNavigate } from "react-router-dom";


function ResetPasswordWithEmail() {
  const [email, setEmail] = useState("");
  const [isloading, setIsloading] = useRecoilState(loadingState);
  const navigate =useNavigate()

  const submitHanlder = async (e) => {
    e.preventDefault();
    try {
        setIsloading(true)
      await axios.post("/api/users/reset-password", { email });
      setIsloading(false)
      setEmail("")
      toast.success('The password reset link has sent to your Email')
    } catch (err) {
        setIsloading(false)
      toast.error(displayError(err));
    }
  };


  

  return (
    <div className="bg-[#12181b] h-screen flex__center " id="signin">
      <div className="signin-box flex-col-center text-color_white font-openSans py-[4rem] px-[5rem] w-[500px]">
        <div className="flex-col-center">
          <h1 className="text-4xl font-bold mb-8 ">Password Reset</h1>
        </div>

        <form
          className="flex flex-col self-start w-full relative"
          onSubmit={submitHanlder}
        >
         
          <input
            type="email"
            className="p-3 pl-[54px] bg-[#454e56] rounded-[5rem] outline-none  "
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="absolute top-[11px] left-5 ">
            <HiOutlineMail fontSize={25} color="#498afb" />
          </div>

          <button className="bg-[#09C372] my-8 self-center relative group py-2 flex__center font-medium w-[60%] rounded-lg text-color_white text-xl cursor-pointer ">
            <div className="absolute inset-0 bg-color_black  duration-300 ease-in-out opacity-0 group-hover:opacity-30 w-full h-full" />
            {isloading ? (
                <>
                  <div className="animate-spin mr-5">
                    {" "}
                    <AiOutlineLoading3Quarters fontSize={22} />
                  </div>{" "}
                  <p>Loading....</p>
                </>
              ) : (
                "Send"
              )}
          </button>
        </form>
        
        <a
            href="#order_body"
            className="flex__center space-x-3 self-end  nav-hover cursor-pointer text-[#3E73CE]"
            onClick={() => navigate("/signin")}
          >
            <HiOutlineArrowNarrowLeft fontSize={25} />{" "}
            <h1>Back to Sign In</h1>
          </a>
      </div>
    </div>
  );
}

export default ResetPasswordWithEmail;

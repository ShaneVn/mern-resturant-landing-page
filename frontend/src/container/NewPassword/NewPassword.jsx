import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";
import displayError from "../../utils/displayError";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { loadingState } from "../../atoms/atoms";
import { FaLock } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [isloading, setIsloading] = useRecoilState(loadingState);
  const { token }= useParams()
  const navigate = useNavigate()

  const submitHanlder = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      toast.error("password not matched");
      return
    }

      try {
          setIsloading(true)
        await axios.post("/api/users/new-password", {token, password });
        setIsloading(false)
        toast.success('Your password has been changed')
        navigate("/signin")
        
      } catch (err) {
        console.log(err)
          setIsloading(false)
        toast.error(displayError(err));
      }
  };

  console.log(password)

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
            type="password"
            className="p-3 pl-[54px] bg-[#454e56] rounded-[5rem] outline-none mb-7  "
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="absolute top-[8px] left-5 ">
            <FaLock fontSize={25} color="#498afb" />
          </div>

          <input
            type="password"
            className="p-3 pl-[54px] bg-[#454e56] rounded-[5rem] outline-none  "
            placeholder="Confirm Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="absolute top-[85px] left-5 ">
            <FaLock fontSize={25} color="#498afb" />
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
              "Reset"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPassword;

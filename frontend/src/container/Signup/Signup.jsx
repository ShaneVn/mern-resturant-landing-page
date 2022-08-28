import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { userState } from "../../atoms/atoms";
import { useRecoilState,} from "recoil";
import displayError from "../../utils/displayError";
import { toast } from "react-toastify";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const [error,setError] = useState("")
  


  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/users/signup", {
        email,
        name,
        password,
      });
      setUser(data);
    } catch (err) {
      setError(displayError(err))
      toast.error(displayError(err));
    }
  };


  return (
    <div className="bg-[#12181b] h-screen flex__center " id="signin">
      <div className="signin-box flex-col-center text-color_white font-openSans py-[3rem] px-[5rem] w-[500px]">
        <div className="flex-col-center">
          <h1 className="text-4xl font-bold mb-3 ">Register </h1>
          <p className="text-[#b2becd] mb-8">
            And Enjoy The New Food Adventure!
          </p>
        </div>

        <form
          onSubmit={submitForm}
          className="flex flex-col self-start w-full relative"
        >
          <p className="mb-3 ">Email</p>
          <input
            type="text"
            className="p-3 pl-[54px] bg-[#454e56] rounded-[5rem] outline-none  "
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="absolute top-[46px] left-5 ">
            <HiOutlineMail fontSize={25} color="#498afb" />
          </div>

          <p className="mb-3  mt-6">Username</p>
          <input
            type="text"
            className="p-3 pl-[54px] bg-[#454e56] rounded-[5rem] outline-none  "
            placeholder="UserName"
            onChange={(e) => setName(e.target.value)}
          />

          <p className="mb-3 mt-6">Password</p>
          <input
            type="password"
            className="p-3 pl-[54px] bg-[#454e56] rounded-[5rem] outline-none"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="absolute top-[154px] left-5">
            <AiOutlineUser fontSize={25} color="#9166cc" />
          </div>

          <div className="absolute top-[264px] left-5">
            <FaLock fontSize={22} color="#fa8142" />
          </div>
          <button
            href="#payment"
            className="bg-[#09C372] my-8 self-center relative group py-2 flex__center font-medium w-[60%] rounded-lg text-color_white text-xl cursor-pointer "
          >
            <div className="absolute inset-0 bg-color_black  duration-300 ease-in-out opacity-0 group-hover:opacity-30 w-full h-full" />
            Sign Up
          </button>
        </form>

        { error && <p className="mb-5 text-[#FF9494] ">{error}</p>}
        <p className="text-[#b2becd]">
          Already have an Account?{" "}
          <span
            className="cursor-pointer text-[#3E73CE] nav-hover"
            onClick={() => navigate("/signin")}
          >
            {" "}
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;

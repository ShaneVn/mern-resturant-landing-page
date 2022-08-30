import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLock } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { userState } from "../../atoms/atoms";
import { useRecoilState } from "recoil";
import displayError from "../../utils/displayError";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signin.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useRecoilState(userState);

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      setUser(data);
      toast.success("You Have Signed In")
    } catch (err) {
      setError(displayError(err));
      toast.error(displayError(err));
    }
  };

  return (
    <div className="bg-[#12181b] h-screen flex__center " id="signin">
      <div className="signin-box flex-col-center text-color_white font-openSans py-[4rem] px-[5rem] w-[500px]">
        <div className="flex-col-center">
          <h1 className="text-4xl font-bold mb-3 ">Welcome Back</h1>
          <p className="text-[#b2becd] mb-8">We Miss You!</p>
        </div>

        <form
          onSubmit={submitForm}
          className="flex flex-col self-start w-full relative"
        >
          <p className="mb-3">Email</p>
          <input
            type="text"
            className="p-3 pl-[54px] bg-[#454e56] rounded-[5rem] outline-none  "
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="absolute top-[46px] left-5 ">
            <HiOutlineMail fontSize={25} color="#498afb" />
          </div>

          <p className="mb-3 mt-6">Password</p>
          <input
            type="password"
            className="p-3 pl-[54px] bg-[#454e56] rounded-[5rem] outline-none"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="absolute top-[155px] left-5">
            <FaLock fontSize={22} color="#9166cc" />
          </div>

          <button className="bg-[#09C372] my-8 self-center relative group py-2 flex__center font-medium w-[60%] rounded-lg text-color_white text-xl cursor-pointer ">
            <div className="absolute inset-0 bg-color_black  duration-300 ease-in-out opacity-0 group-hover:opacity-30 w-full h-full" />
            Log in
          </button>
        </form>

        {error && (
          <div>
            <p className="mb-5 text-[#FF9494] ">{error}</p>
          </div>
        )}
        <p className="text-[#b2becd]">
          Don' have an Account?{" "}
          <span
            className="cursor-pointer text-[#3E73CE] nav-hover"
            onClick={() => navigate("/signup")}
          >
            {" "}
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signin;

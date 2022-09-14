import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLock } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { userState,loadingState } from "../../atoms/atoms";
import { useRecoilState } from "recoil";
import displayError from "../../utils/displayError";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signin.css";
import DropDown from "../../components/DropDown/DropDown";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import LoginButton from "../../components/LoginButton/LoginButton";




function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const [isloading, setIsloading] = useRecoilState(loadingState);

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      setIsloading(true)
      const { data } = await axios.post("/api/users/signin", {
        email: email.toLowerCase(),
        password,
      });
      setIsloading(false)
      setUser(data);
      toast.success("You Have Signed In")
    } catch (err) {
      setIsloading(false)
      setError(displayError(err));
      toast.error(displayError(err),{toastId: "signInError"});
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
            type="email"
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

          <LoginButton text="Log in"/>
        </form>

        {/* {error && (
          <div>
            <p className="mb-5 text-[#FF9494] ">{error}</p>
          </div>
        )} */}
        <p className="text-[#b2becd] mb-3">
          Don' have an Account?{" "}
          <span
            className="cursor-pointer text-[#3E73CE] nav-hover"
            onClick={() => navigate("/signup")}
          >
            {" "}
            Sign Up
          </span>
        </p>

        {/* <p
            className="cursor-pointer text-[#3E73CE] nav-hover mt-4"
            onClick={() => navigate("/resetpassword")}
          >
            {" "}
            Forgot Password 
          </p> */}
          <DropDown/>
      </div>
    </div>
  );
}

export default Signin;

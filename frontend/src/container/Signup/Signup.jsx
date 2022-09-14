import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { userState,loadingState } from "../../atoms/atoms";
import { useRecoilState } from "recoil";
import displayError from "../../utils/displayError";
import { toast } from "react-toastify";
import validator from "validator";
import axios from "axios";
import LoginButton from "../../components/LoginButton/LoginButton";



function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const [error, setError] = useState("");
  const [goodPassword, setGoodPassword] = useState(false);
  const [isloading, setIsloading] = useRecoilState(loadingState);

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 0,
        minUppercase: 0,
      })
    ) {
      setError("Good Password");
      setPassword(value);
      setGoodPassword(true);
    } else {
      setGoodPassword(false);
      setError(
        "Password should be at least 8 characters with 1 letter and 1 number"
      );
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!goodPassword) {
      return;
    }

    try {
      setIsloading(true)
      const { data } = await axios.post("/api/users/signup", {
        email: email.toLowerCase(),
        name,
        password,
      });
      setIsloading(false)
      toast.success("An activation link has sent to your email");
      navigate("/signin")
    } catch (err) {
      setIsloading(false)
      toast.error(displayError(err), { toastId: "signUpError" });
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
            type="email"
            className="p-3 pl-[54px] bg-[#454e56] rounded-[5rem] outline-none  "
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
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
            required
          />

          <p className="mb-3 mt-6">Password</p>
          <input
            type="password"
            className="p-3 pl-[54px] bg-[#454e56] rounded-[5rem] outline-none"
            placeholder="Password"
            onChange={(e) => validate(e.target.value)}
            required
          />
          <div className="absolute top-[154px] left-5">
            <AiOutlineUser fontSize={25} color="#9166cc" />
          </div>

          <div className="absolute top-[264px] left-5">
            <FaLock fontSize={22} color="#fa8142" />
          </div>
          <LoginButton text="Sign Up"/>
        </form>

        {error && <p className={`mb-5 ${goodPassword ? "text-[#09C372]" : "text-[#FF9494]" } text-center`}>{error}</p>}
        <p className="text-[#b2becd]">
          Already have an Account?{" "}
          <span
            className="cursor-pointer text-[#3E73CE] nav-hover"
            onClick={() => navigate("/signin")}
          >
            {" "}
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;

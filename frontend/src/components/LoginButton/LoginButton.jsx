import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { loadingState } from "../../atoms/atoms";
import { useRecoilState } from "recoil";

function LoginButton({ text }) {
const [isloading, setIsloading] = useRecoilState(loadingState);
  return (
    <button disabled={isloading && true}  
    className="bg-[#09C372] my-8 self-center relative group py-2 flex__center font-medium w-[60%] rounded-lg text-color_white text-xl cursor-pointer ">
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
         <p>{text}</p>
        )}
    </button>
  )
}

export default LoginButton
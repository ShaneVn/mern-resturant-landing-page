import React, { useEffect } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { orderNumberState } from "../../atoms/atoms";
import { useNavigate } from "react-router-dom";
import animation from "../../lottie/paymentsuccess.json";
import Lottie from "lottie-react";

function PaymentSuccess() {
  const [orderNumber, setOrderNumber] = useRecoilState(orderNumberState);
  const navigate = useNavigate();

  useEffect(()=>{
        !orderNumber && navigate("/")
  },[])

  return (
    <div className="flex__center h-screen section__padding relative ">
      <div className="flex-col-center space-y-5  ">
        <h1 className="text-3xl font-openSans font-bold">Payment Success</h1>
        <IoCheckmarkCircleOutline fontSize={100} color={"green"} />
        <h1 className="text-3xl font-openSans font-bold">
          {" "}
          Your Order Number is:{" "}
        </h1>
        <h1 className="text-xl font-openSans font-bold">{orderNumber} </h1>
        <h1 className="text-xl font-openSans font-bold">
          We also Sent you an email for confirmation{" "}
        </h1>
        <div
          className="flex nav-hover text-[#0000EE] hover:text-[green]"
          onClick={() => navigate("/order")}
        >
          <HiOutlineArrowNarrowLeft fontSize={25} />{" "}
          <h1 className="ml-5">Back To Menu</h1>{" "}
        </div>
      </div>

      <div className="absolute -z-30">
        <Lottie animationData={animation} loop={0} />
      </div>
    </div>
  );
}

export default PaymentSuccess;

import React, { useEffect, useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { loadingState } from "../../atoms/atoms";
import { useNavigate, useParams } from "react-router-dom";
import animation from "../../lottie/paymentsuccess.json";
import Lottie from "lottie-react";
import axios from "axios";
import displayError from "../../utils/displayError";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";

function AccountActivation() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [isloading, setIsloading] = useRecoilState(loadingState);
  const [AccountActivated, setAccountActivated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      try {
        await axios.post("/api/users/account-activation", {
          token,
        });

        setIsloading(false);
        setAccountActivated(true);
      } catch (err) {
        setAccountActivated(false);
        setIsloading(false);
        toast.error(displayError(err), { toastId: "activationError" });
      }
    };
    fetchData();
  }, []);

  if (isloading) {
    return <Loading />;
  }

  return (
    <div className="flex__center h-screen section__padding relative ">
      {AccountActivated && (
        <>
          <div className="flex-col-center space-y-5  ">
            <h1 className="text-3xl font-openSans font-bold">
              Account Verified
            </h1>
            <IoCheckmarkCircleOutline fontSize={100} color={"green"} />
            <h1 className="text-3xl font-openSans font-bold">
              {" "}
              Your Account has been activated{" "}
            </h1>

            <div
              className="flex nav-hover text-[#0000EE] hover:text-[green]"
              onClick={() => navigate("/signin")}
            >
              <HiOutlineArrowNarrowLeft fontSize={25} />{" "}
              <h1 className="ml-5">Back To Signin</h1>{" "}
            </div>
          </div>

          <div className="absolute -z-30">
            <Lottie animationData={animation} loop={0} />
          </div>
        </>
      )}
    </div>
  );
}

export default AccountActivation;

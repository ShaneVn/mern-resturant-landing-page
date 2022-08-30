import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { cartState, loadingState } from "../../atoms/atoms";
import { Button, CheckOutDetailsList, CheckOutItems } from "../../components";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import PaymentTextInput from "../../components/TextInput/PaymentTextInput";
import axios from "axios";
import { toast } from "react-toastify";
import displayError from "../../utils/displayError";

function Payment() {
  const [cart, setCart] = useRecoilState(cartState);
  const [isloading, setIsloading] = useRecoilState(loadingState);
  const navigate = useNavigate();
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    cart.length < 1 && navigate("/checkout");
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsloading(true);
      await axios.post("/api/email/sendemail", {
        email,
      });
      setIsloading(false);
      setEmail("");
      setFirstname("");
      setCart([]);
      setLastName("");
      setPhoneNumber("");
      toast.success("Your order is placed, Please Check Your Email");
    } catch (err) {
      toast.error(displayError(err));
      setIsloading(false);
    }
  };

  console.log(orderId);

  const totalItems = cart.reduce((a, b) => a + b.quantity, 0);

  const totalBeforeTax =
    Math.round(cart.reduce((a, b) => a + b.quantity * b.price, 0) * 1e2) / 1e2;

  const taxes = Math.round(totalBeforeTax * 0.0725 * 1e2) / 1e2;

  const orderTotalAfterTaxes = (taxes + totalBeforeTax).toFixed(2);

  return (
    <form
      className="section__padding app__bg min-h-screen"
      id="checkout"
      onSubmit={submitHandler}
    >
      <h1 className="section-title mt-[60px] "> Your Info</h1>
      <div
        className="flex flex-col 2xl:flex-row   
       items-center 2xl:justify-between 2xl:items-start mt-12 "
      >
        <div className=" w-full 2xl:w-[70%] flex flex-col  2xl:flex-row flex-wrap items-center mb-[4rem] ">
          <PaymentTextInput
            placeholder={"First Name"}
            setInPutValue={setFirstname}
          />
          <PaymentTextInput
            placeholder={"Last Name"}
            setInPutValue={setLastName}
          />
          <PaymentTextInput
            placeholder={"Email"}
            setInPutValue={setEmail}
            email
          />
          <PaymentTextInput
            placeholder={"Phone Number"}
            setInPutValue={setPhoneNumber}
          />
        </div>

        {/* Payment box here */}
        <div className="flex-col-center checkout-text w-[70%] 2xl:w-[20%] space-y-9 self-start md:w-[50%]">
          <CheckOutDetailsList category={"Total Items:"} info={totalItems} />
          <CheckOutDetailsList category={"Tax:"} info={`$${taxes}`} />
          <CheckOutDetailsList
            category={"Pre Tax:"}
            info={`$${totalBeforeTax}`}
          />
          <CheckOutDetailsList
            category={"Order Total:"}
            info={`$${orderTotalAfterTaxes}`}
          />

          {cart.length > 0 && (
            <button
              className="bg-[#FFA41C] relative group  py-3 flex__center font-medium w-full rounded-lg text-color_black cursor-pointer "
              onClick={() => navigate("/payment")}
            >
              <div className="absolute inset-0 bg-color_black  duration-300 ease-in-out opacity-0 group-hover:opacity-30 w-full h-full" />
              Place Order
            </button>
          )}
          <div className="border-b-2 border-color_gray w-full " />
          <a
            href="#order_body"
            className="flex__center space-x-5 self-start mt-[-30px] nav-hover"
          >
            <HiOutlineArrowNarrowLeft fontSize={25} /> <h1>Go Back To Cart</h1>
          </a>
        </div>
      </div>
    </form>
  );
}

export default Payment;

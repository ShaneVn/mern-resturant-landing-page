import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { cartState, loadingState, userState } from "../../atoms/atoms";
import { Button, CheckOutDetailsList, CheckOutItems } from "../../components";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import PaymentTextInput from "../../components/TextInput/PaymentTextInput";
import axios from "axios";
import { toast } from "react-toastify";
import displayError from "../../utils/displayError";
import { GiConsoleController } from "react-icons/gi";

function Payment() {
  const [cart, setCart] = useRecoilState(cartState);
  const [isloading, setIsloading] = useRecoilState(loadingState);
  const navigate = useNavigate();
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [orderId, setOrderId] = useState("");
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    cart.length < 1 && navigate("/checkout");
  }, []);

  const itemList = cart
    .map((item) => `${item.name} x ${item.quantity}`)
    .join(",");

  const totalItems = cart.reduce((a, b) => a + b.quantity, 0);

  const totalBeforeTax =
    Math.round(cart.reduce((a, b) => a + b.quantity * b.price, 0) * 1e2) / 1e2;

  const taxes = Math.round(totalBeforeTax * 0.0725 * 1e2) / 1e2;

  const orderTotalAfterTaxes = (taxes + totalBeforeTax).toFixed(2);
 

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsloading(true);

     const {data} = await axios.post("/api/order", {
        orderItems: cart.map((x) => ({ ...x, total: x.price * x.quantity })),
        grandTotal: orderTotalAfterTaxes,
        user: user && user.user_id,
        firstName,
        lastName,
        phone,
      });


      await axios.post("/api/email/sendemail", {
        email,
        order: itemList,
        total: orderTotalAfterTaxes,
        firstName,
        lastName,
        phone,
        orderId: data.order._id
      });
      setIsloading(false);
      setEmail("");
      setFirstname("");
      setCart([]);
      setLastName("");
      setPhoneNumber("");
      toast.success(`Your order ${data.order._id} is placed, Please Check Your Email`);
    } catch (err) {
      toast.error(displayError(err));
      setIsloading(false);
    }
  };

  

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
            type="text"
          />
          <PaymentTextInput
            placeholder={"Last Name"}
            setInPutValue={setLastName}
            type="text"
          />
          <PaymentTextInput
            placeholder={"Email"}
            setInPutValue={setEmail}
            type="email"
          />
          <PaymentTextInput
            placeholder={"Phone Number"}
            setInPutValue={setPhoneNumber}
            type="number"
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
            onClick={() => navigate("/checkout")}
          >
            <HiOutlineArrowNarrowLeft fontSize={25} /> <h1>Go Back To Cart</h1>
          </a>
        </div>
      </div>
    </form>
  );
}

export default Payment;

import React from "react";
import { useRecoilState } from "recoil";
import { cartState } from "../../atoms/atoms";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function CheckOutItems({ image, name, price, quantity, total, id }) {
  const [cart, setCart] = useRecoilState(cartState);
  const decreaseItems = () => {
    const deleteItemIndex = cart.findIndex((index) => index.id === id);

    if (cart[deleteItemIndex].quantity > 1) {
      setCart((cart) =>
        cart.map((item) => {
          if (item.id === id && item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          } else {
            return item;
          }
        })
      );
    } else {
      setCart((cart) => cart.filter((item) => item.id !== id));
    }
  };

  const increaseItmes = () => {
    setCart((cart) =>
      cart.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="flex flex-col checkout-text ">
      <ul className="w-full flex items-center justify-between   ">
        <li className="p__cormorant w-[100px] lg:w-[100px] md:w-[150px] h-[100px] flex flex-col lg:flex-row lg:items-center  mb-5 sm:mb-12 lg:mb-0 md:mr-5 lg:mr-0">
          <img
            src={image}
            alt=""
            className=" mr-5 object-cover w-full h-full  "
          />
          <div className="">
            <h2> {name} </h2>
          </div>
        </li>

        <li className=" ml-[10px] md:ml-[-50px] lg:ml-[10px]">${price}</li>
        <div className="flex lg:space-x-6 space-x-3 items-center justify-center border-[1px] border-color_gray rounded-md lg:py-2 lg:px-5 mx-6 lg:mx-0 py-2 px-2">
          <div
            className=" cursor-pointer text-white nav-hover"
            onClick={decreaseItems}
          >
            <AiOutlineMinus fontSize={15} />
          </div>

          <li className="">{quantity}</li>
          <div
            className=" cursor-pointer text-white nav-hover"
            onClick={increaseItmes}
          >
            <AiOutlinePlus fontSize={15} />
          </div>
        </div>
        <li className="">${total.toFixed(2)}</li>
      </ul>

      <div className="border-b-[1px] border-color_gray mt-5" />
    </div>
  );
}

export default CheckOutItems;

import React from "react";
import Button from "../Button/Button";

import { useRecoilState } from "recoil";
import { cartState } from "../../atoms/atoms";
import { toast } from "react-toastify";

function OrderItem({ desc, image, name, price, alt, id }) {
  const [cart, setCart] = useRecoilState(cartState);

  const addItmesToCart = () => {
    const currentItemIndex = cart.findIndex((item) => item.id === id);
    toast.success("You Have Add An Item To Cart",{toastId: "addItmesToCart"})
    if (currentItemIndex >= 0) {
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
    } else setCart([...cart, { image, name, price, quantity: 1, id }]);
  };


  console.log(cart)
 

  return (
    <div className="flex flex-col justify-center items-center space-y-6 flex-1 mt-5 mb-7 2xl:mb-0">
      <div
        className="h-[300px] w-[300px] "
        style={{ boxShadow: "8px 8px #fdc500" }}
      >
        <img src={image} alt={alt} className="h-full w-full object-cover" />
      </div>
      <div className="text-center w-[50%]">
        <h1 className="p__cormorant mt-5">{name}</h1>
        <p className="body-text text-center">{desc}</p>
      </div>
      <h1 className="p__cormorant">${price}</h1>
      <div onClick={addItmesToCart}>
        <Button text="Add To Cart" />
      </div>
    </div>
  );
}

export default OrderItem;

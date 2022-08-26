import React from "react";
import "./Order.css";
import { Button } from "../../components";

function Order() {
  return (
    <div
      className="h-screen w-full order__header flex items-center  "
      id="order_home"
    >
      <div
        className="section__padding lg:ml-[200px] lg:mt-[120px]"
        data-aos="fade-down"
        data-aos-duration="1200"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
      >
        <h1 className="section-title font-bold text-white border-b-[7px] border-r-4 pr-5 lg:pr-[80px] border-color_golden mb-12">
          Best Food In Town <br /> Order Now!
        </h1>

        <Button text="Place Order" section="order_body" />
      </div>
    </div>
  );
}

export default Order;

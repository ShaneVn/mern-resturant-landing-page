import React from "react";
import { MenuItem, SubHeading } from "../../components";
import images from "../../constants/images";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";

const SpecialMenu = () => {

  const [drink, setDrink] = useState([])

  useEffect(()=>{
      const fetchData= async()=>{
        const result = await axios.get("/api/product")
        setDrink(result.data)
      }

      fetchData()

  },[])



  const navigate = useNavigate()
  return (
    <div
      className=" flex flex-col items-center bg-color_black section__padding  "
      id="menu"
    >
      {/* top part */}
      <div className="flex flex-col items-center justify-center text-center">
        <SubHeading title="Menu That Fits Your Palette" imageCenter={true} />
        <h1 className="section-title ">Today's Special</h1>
      </div>

      {/* middle part*/}
      <div className="flex flex-col xl:flex-row items-center justify-center space-x-10 w-full   ">
        {/* left side text */}
        <div
          className=" flex flex-col items-center flex-1 w-full "
          data-aos="flip-left"
          data-aos-duration="1500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
        >
          <h1 className="text-color_white font-cormorant text-[40px] mb-10">
            Wine & Beer
          </h1>
          {drink?.product?.wines.map((wine, index) => (
            <MenuItem
              key={wine.title + index}
              title={wine.title}
              price={wine.price}
              tags={wine.tags}
            />
          ))}
        </div>

        {/* middle imgage */}
        <div>
          <img
            src={images.drink}
            alt="cocktails"
            className="rounded-lg w-[410px] h-auto"
          />
        </div>

        {/* right part text */}
        <div
          className=" flex flex-col items-center flex-1 w-full"
          data-aos="flip-right"
          data-aos-duration="1500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
        >
          <h1 className="text-color_white font-cormorant text-[40px] mb-10 mt-5 sm:mt-0">
            Cocktails
          </h1>
          {drink?.product?.cocktails.map((wine, index) => (
            <MenuItem
              key={wine.title + index}
              title={wine.title}
              price={wine.price}
              tags={wine.tags}
            />
          ))}
        </div>
      </div>
      <div className="mt-10" onClick={()=>navigate("/order")}>
        <Button text="View More" section="order_menu" />
      </div>
    </div>
  );
};

export default SpecialMenu;

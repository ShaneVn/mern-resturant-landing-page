import React from "react";
import { SubHeading } from "../../components";
import { Button } from "../../components";
import { images } from "../../constants";
import { useNavigate } from "react-router-dom";

const FindUs = () => {

  const navigate = useNavigate()

  return (
    <div className="flex__center app__bg section__padding flex-col xl:flex-row " id="contact">
      <div className="flex-1 flex flex-col mr-[80px] mb-[100px] xl:mb-0 self-start xl:self-center">
        <SubHeading title="contact" />
        <h1 className="section-title mb-[50px]">Find Us</h1>
        <p className="body-text mb-[50px]">
          Lane Ends Bungalow, Whatcroft Hall Lane, Rudheath, CW9 7SG
        </p>
        <div className="flex flex-col space-y-5 mb-10">
          <p className="font-cormorant text-color_golden text-2xl font-medium">
            Opening Hours
          </p>
          <p className="font-openSans text-color_white tracking-[0.04em]">Mon - Fri: 10:00 am - 010:00 pm</p>
          <p className="font-openSans text-color_white tracking-[0.04em]">Sat - Sun: 10:00 am - 03:00 am</p>
        </div>
        <p></p>
        <div onClick={()=>navigate("/location")}>
        <Button text="Visit Us"  section="location"/>
        </div>
      </div>

      <div className="flex-1 ">
        <img src={images.findus} alt="" className="w-[90%]" />
      </div>
    </div>
  );
};
export default FindUs;

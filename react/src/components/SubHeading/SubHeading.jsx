import React from "react";
import images from "../../constants/images";

const SubHeading = ({ title, imageCenter }) => {

  return (
    <div className={imageCenter && "flex flex-col items-center"}>
      <p className="text-color_white mb-2 p__cormorant">{title}</p>
      <img className="text-color_golden" src={images.spoon_right} alt="" />
    </div>
  );
};

export default SubHeading;

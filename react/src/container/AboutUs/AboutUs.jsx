import React, { useState } from "react";
import images from "../../constants/images";
import Lottie from "lottie-react";
import animation from "../../lottie/wine-shake.json";
import { Waypoint } from "react-waypoint";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper";
import { Button } from "../../components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

const AboutUs = () => {
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animation,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  let [renderLottie, setRenderLottie] = useState(false);

  // const { View } = useLottie(defaultOptions);
  return (
    <div
      className="app__bg flex flex-col 2xl:flex-row items-center justify-center section__padding 2xl:h-screen"
      id="about"
    >
      {/* <div className="absolute  flex__center z-0">
        <img src={images.G} alt="G" className="w-[391px] h-[415px]" />
      </div> */}

      <Waypoint onEnter={() => setRenderLottie(true)} />
      <Waypoint onLeave={() => setRenderLottie(false)} />

      {/* left part text */}
      <div
        className="z-10 flex flex-col lg:items-end mr-[80px] flex-1 items-start mb-5 lg:self-start 
      lg:ml-auto"
        data-aos="fade-left"
        data-aos-duration="800"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
      >
        <h1 className="section-title">About Us</h1>
        <img src={images.spoon_left} alt="spoon" className="mb-5" />
        <p className="text-color_grey lg:text-end mb-10 font-openSans leading-8 ">
          {" "}
          Sit tellus lobortis sed senectus vivamus molestie. Condimentum
          volutpat morbi facilisis tellu
        </p>
        <Button text="Know More" section="chef"/>
        {renderLottie && (
          <div className="hidden 2xl:flex mt-[90px]">
            {" "}
            <Lottie animationData={animation} loop={2} />{" "}
          </div>
        )}
      </div>

      {/* middle image  */}
      {/* <div className="z-10 mt-5 mb-4  lg:w-[575px]">
        <img
          src={images.about}
          alt=""
          className=" rounded-lg "
        />
      </div> */}
      {/* <div className="z-10 mt-5 mb-4"> */}
      <Swiper
        modules={[Navigation, EffectFade, Autoplay]}
        navigation
        effect={"fade"}
        speed={1200}
        slidesPerView={1}
        loop
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        className="w-full h-[326px] sm:h-[400px] lg:w-[575px] lg:h-[575px] z-10 mt-5 mb-4"
      >
        <SwiperSlide>
          <img
            src={images.about}
            alt=""
            className="rounded-lg w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={images.slider_two}
            alt=""
            className="rounded-lg w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={images.slider_three}
            alt=""
            className="rounded-lg w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
      {/* </div> */}

      {/* right side text */}
      <div
        className="z-10  flex-1 ml-[70px] flex flex-col items-end lg:items-start lg:self-end"
        data-aos="fade-right"
        data-aos-duration="800"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
      >
        <h1 className="section-title ">Our History</h1>
        <img src={images.spoon_right} alt="spoon" className="mb-5" />
        <p className="text-color_grey font-openSans mb-10 lg:text-start text-end leading-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat
        </p>
        <Button text="Know More" section="chef"/>
      </div>
    </div>
  );
};

export default AboutUs;

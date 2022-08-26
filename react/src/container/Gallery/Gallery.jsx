import React from "react";
import { images } from "../../constants";
import { SubHeading } from "../../components";
import { Button } from "../../components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

import "./Gallery.css";

const Gallery = () => {
  const galleryImages = [
    images.gallery01,
    images.gallery02,
    images.gallery03,
    images.gallery04,
  ];

  return (
    <div
      className="bg-color_black section__padding flex flex-col xl:flex-row"
      id="gallery"
    >
      <div className="flex flex-col mr-[70px] xl:w-1/3 ">
        <SubHeading title="Instagram" />
        <h1 className="section-title mb-12"> Photo Gallery</h1>
        <p className="body-text mb-10">
          {" "}
          Sit tellus lobortis sed senectus vivamus molestie. Condimentum
          volutpat morbi facilisis tellu
        </p>
        <Button text="Know More" />
      </div>
      <Swiper
        modules={[Navigation, EffectFade, Autoplay]}
        navigation
        speed={1200}
        slidesPerView={1}
        spaceBetween={60}
        loop
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          576: {
            // width: 576,
            slidesPerView: 1.7,
          },
          1280: {
            // width: 1280,
            slidesPerView: 2,
          },
          1800: {
            // width: 1280,
            slidesPerView: 2.7,
          },
        }}
        className="xl:w-2/3 w-full mt-12 xl:mt-0 xl:h-[500px] h-[450px] "
      >
        {galleryImages.map((img) => (
          <SwiperSlide className="" key={Math.random()}>
            <img
              src={img}
              alt=""
              className=" w-full h-full object-cover cursor-pointer hover-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;

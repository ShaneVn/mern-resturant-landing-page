import { Button } from "../../components";
import { header_bg, mobile_header } from "../../constants";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full relative bg-color_black" id="home">
      <video
        className="w-full h-full object-cover hidden sm:flex"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={header_bg} type="video/mp4" />
      </video>

      <video
        className="w-full h-full sm:hidden"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={mobile_header} type="video/mp4" />
      </video>
      {/* block of text here */}
      <div
        className="flex flex-col items-center justify-center absolute inset-0 text-center"
        data-aos="fade-right"
        data-aos-duration="1200"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
      >
        <div className="space-y-7 mb-[90px] sm:mb-0 ">
          <div className="">
            <h1 className="section-title font-bold text-white">Every Flavor</h1>
            <h1 className="section-title font-bold text-white">
              Tells a Story
            </h1>
          </div>
          <div className="" onClick={() => navigate("/order")}>
            <Button text="Explore Menu" section="order_menu" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

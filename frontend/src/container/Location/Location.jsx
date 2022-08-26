import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./Location.css";
import { images } from "../../constants";
import { SubHeading } from "../../components";
import { Button } from "../../components";

function Location() {
  const sendEmail = () => {};

  return (
    <div
      className="w-full  flex flex-col justify-center items-center  "
      id="location"
    >
      <div className="location__background w-full h-[700px] flex flex-col justify-center items-center">
        <h1 className="section-title mb-[80px]">Our Location</h1>
        <div className="flex flex-col space-y-5 mb-10">
          <p className="font-openSans text-color_white tracking-[0.04em] text-lg">
            Mon - Fri: 10:00 am - 10:00 pm
          </p>
          <p className="font-openSans text-color_white tracking-[0.04em] text-lg">
            Sat - Sun: 10:00 am - 03:00 am
          </p>
        </div>
      </div>
      <div className="h-[800px] bg-color_black w-full px-[50px] xl:px-[250px] flex__center ">
        <MapContainer
          center={[37.773972, -122.431297]}
          zoom={10}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[37.773972, -122.431297]}>
            <Popup>
              127 DUVAL SOUTH <br />
              SAN FRANCISCO <br />
              CA 94080-1135 USA
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="w-full flex flex-col lg:flex-row app__bg px-[50px] xl:px-[250px] py-[30px] xl:py-[120px] justify-center items-center">
        <div className="flex-1 flex flex-col lg:mr-[80px] mb-[100px] xl:mb-0 w-full">
          <SubHeading title="contact" />
          <h1 className="section-title mb-[50px]">Send a message</h1>
          <form onSubmit={sendEmail} className="space-y-10 mb-10">
            <div className=" border-[1px] w-full xl:mr-10 mb-5 xl:mb-0 border-color_gray rounded-[5px] overflow-hidden text-lg ">
              <input
                type="text"
                placeholder="Your Name"
                className="app__bg outline-none text-color_white p-4 caret-white font-cormorant w-full "
              />
            </div>
            <div className=" border-[1px] w-full xl:mr-10 mb-5 xl:mb-0 border-color_gray rounded-[5px] overflow-hidden text-lg ">
              <input
                type="text"
                placeholder="Your Email"
                className="app__bg outline-none text-color_white p-4 caret-white font-cormorant w-full "
              />
            </div>

            <div className=" border-[1px] w-full xl:mr-10 mb-5 xl:mb-0 border-color_gray rounded-[5px] overflow-hidden text-lg ">
              <textarea
                type="text"
                placeholder="Your Message"
                className="app__bg outline-none text-color_white p-4 pb-12 caret-white font-cormorant w-full "
              />
            </div>
          </form>
          <Button text="Send Message" />
        </div>
        <div className="flex-1 ">
          <img src={images.findus} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Location;

import { useState } from "react";
import images from "../../constants/images";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { RiShoppingCartLine, RiShoppingCartFill } from "react-icons/ri";
import { useRecoilState } from "recoil";
import { cartState } from "../../atoms/atoms";
import { userState } from "../../atoms/atoms";

// <GiHamburgerMenu/>
const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [cart, setCart] = useRecoilState(cartState);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  

  const handleSignOut = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div
      className="flex bg-color_black justify-between items-center py-5 lg:px-[100px] px-[50px] text-white fixed w-full z-50 top-0"
      data-aos="fade-down"
      data-aos-duration="700"
      data-aos-easing="ease-in-out"
    >
      <div>
        <a href="#home" onClick={() => navigate("/")}>
          {" "}
          <h1 className="text-4xl font-cormorant cursor-pointer text-color_golden font-bold">
            L’Orphéon
          </h1>{" "}
        </a>
      </div>
      <div>
        <ul className="hidden space-x-8 lg:flex font-cormorant text-lg ">
          <li className="">
            <a className="nav-hover" href="#home" onClick={() => navigate("/")}>
              Home
            </a>
          </li>
          <li className="" onClick={() => navigate("/")}>
            <a className="nav-hover" href="#about">
              About
            </a>
          </li>
          <li className="" onClick={() => navigate("/")}>
            <a className="nav-hover" href="#menu">
              Menu
            </a>
          </li>
          <li className="" onClick={() => navigate("/")}>
            <a className="nav-hover" href="#awards">
              Awards
            </a>
          </li>
          <li className="" onClick={() => navigate("/location")}>
            <a className="nav-hover" href="#location">
              Location
            </a>
          </li>
        </ul>
      </div>
      <div className="hidden space-x-8 sm:flex items-center font-cormorant">
        <div className="  relative  ">
          {cart.length > 0 ? (
            <div className="relative">
              <div className="absolute w-6 h-6 top-[-10px] right-[-10px] rounded-full bg-[#F08804] flex__center">
                <h2 className="text-color_black font-semibold font-ubuntu">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </h2>
              </div>
              <a
                className="nav-hover peer cursor-pointer"
                onClick={() => navigate("/checkout")}
                href="#checkout"
              >
                <RiShoppingCartFill fontSize={35} />
              </a>
            </div>
          ) : (
            <div className="relative">
              <a
                className="cursor-pointer peer nav-hover"
                onClick={() => navigate("/checkout")}
                href="#checkout"
              >
                <RiShoppingCartLine fontSize={35} />
              </a>
            </div>
          )}
        </div>
        <a
          className="nav-hover text-lg "
          onClick={() => navigate("/order?mainCourse=Salad&sideDish=Appetizer")}
          href="#order_home"
        >
          Order Online
        </a>
        <div className="border-[0.5px] #545454 h-[30px] border-color_gray" />

        {user ? (
          <div className="cursor-pointer  relative group  ">
            {" "}
            <p className="nav-hover">
              Hello {user.name[0].toUpperCase() + user.name.slice(1)}
            </p>
            <div className="bg-color_black space-y-3 rounded-lg absolute  w-[150px] p-3 flex flex-col text-white text-lg opacity-0 group-hover:opacity-100 duration-1000 ease-in-out">
              <p
                className=" nav-hover "
                onClick={() => navigate("/orderhistory?__page=1")}
              >
                Order History
              </p>
              {/* <div className="border-b-[1px] border-color_gray w-full " /> */}
              <p className=" nav-hover" onClick={handleSignOut}>
                Sign out{" "}
              </p>
            </div>
          </div>
        ) : (
          <Link className="nav-hover text-lg" to={"/signin"}>
            Login / Register
          </Link>
        )}
      </div>

      <div className="lg:hidden flex items-center cursor-pointer">
        {cart.length > 0 ? (
          <div className="relative sm:hidden">
            <div className="absolute w-6 h-6 top-[-10px] right-[-10px] rounded-full bg-[#F08804] flex__center">
              <h2 className="text-color_black font-semibold font-ubuntu">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </h2>
            </div>
            <a
              className="nav-hover peer cursor-pointer"
              onClick={() => navigate("/checkout")}
              href="#checkout"
            >
              <RiShoppingCartFill fontSize={35} />
            </a>
          </div>
        ) : (
          <div className="relative">
            <a
              className="cursor-pointer peer nav-hover"
              onClick={() => navigate("/checkout")}
              href="#checkout"
            >
              <RiShoppingCartLine fontSize={35} />
            </a>
          </div>
        )}
        <div className="nav-hover ml-6">
          <GiHamburgerMenu fontSize={27} onClick={() => setIsToggle(true)} />{" "}
        </div>
      </div>

      {isToggle && (
        <div
          className="h-screen w-full flex flex-col fixed z-50 bg-color_black top-0 
        left-0 justify-center items-center slide-bottom"
        >
          <MdOutlineRestaurantMenu
            fontSize={27}
            className="absolute text-color_golden top-5 right-5 cursor-pointer"
            onClick={() => setIsToggle(false)}
          />
          <ul
            className="text-xl space-y-4 font-cormorant text-color_golden"
            onClick={() => setIsToggle(false)}
          >
            <li className="" onClick={() => navigate("/")}>
              <a className="nav-hover" href="#home">
                Home
              </a>
            </li>
            <li className="" onClick={() => navigate("/order?mainCourse=Salad&sideDish=Appetizer")}>
              <a className="nav-hover" href="#order_home">
                Order
              </a>
            </li>
            {!user && (
              <li className="" onClick={() => navigate("/signin")}>
                <a className="nav-hover" href="">
                  Signin
                </a>
              </li>
            )}
            <li className="" onClick={() => navigate("/")}>
              <a className="nav-hover" href="#about">
                About
              </a>
            </li>
            <li className="" onClick={() => navigate("/")}>
              <a className="nav-hover" href="#menu">
                Menu
              </a>
            </li>
            <li className="" onClick={() => navigate("/")}>
              <a className="nav-hover" href="#awards">
                Awards
              </a>
            </li>
            <li className="" onClick={() => navigate("/")}>
              <a className="nav-hover" href="#contact">
                Contact
              </a>
            </li>
            {user && (
              <li className="" onClick={handleSignOut}>
                Signout
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;

import { useEffect, useState } from "react";
import { Button, OrderItem } from "../../components";
import { images } from "../../constants";
import OrderTitleLists from "../../components/OrderTitleLists/OrderTitleLists";
import { data } from "../../constants";
import "./OrderBody.css";

function OrderBody() {
  const [firstSelected, setFirstSelected] = useState("Salad");
  const [firstData, setFirstData] = useState([]);

  const [secondSelected, setSecondSelected] = useState("Appetizer");
  const [secondData, setSecondData] = useState([]);

  const pizzaMenu = data.pizzaMenu;
  const saladMenu = data.saladMenu;
  const pastaMenu = data.pastaMenu;
  const dessertMenu = data.dessertMenu;
  const appetizerMenu = data.appetizerMenu;

  useEffect(() => {
    switch (firstSelected) {
      case "Pizza":
        setFirstData(pizzaMenu);
        break;
      case "Salad":
        setFirstData(saladMenu);
        break;
      case "Pasta":
        setFirstData(pastaMenu);
        break;
      default:
        setFirstData(saladMenu);
    }
  }, [firstSelected]);

  useEffect(() => {
    switch (secondSelected) {
      case "Dessert":
        setSecondData(dessertMenu);
        break;
      case "Appetizer":
        setSecondData(appetizerMenu);
        break;
      default:
        setSecondData(appetizerMenu);
    }
  }, [secondSelected]);

  return (
    <div
      className="flex flex-col items-center bg-color_black section__padding"
      id="order_body"
    >
      <h1 className="section-title mb-[50px] mt-3 text-center" id="order_menu">
        Choose Your favorite
      </h1>

      <ul
        className="flex items-center menuTitle mb-12 sm:space-x-[200px] space-x-[90px] 
      border-t-[1px] border-b-[1px]  border-color_golden cursor-pointer"
      >
        {data.orderTitleListOne.map((title) => (
          <OrderTitleLists
            category={title.category}
            key={title.category + title.id}
            setSelected={setFirstSelected}
            active={firstSelected === title.category}
          />
        ))}
      </ul>

      {/* food items here */}
      <div className="flex flex-col 2xl:flex-row justify-center items-center mb-[150px]">
        {firstData.map((data) => (
          <OrderItem
            image={data.img}
            alt={data.alt}
            desc={data.desc}
            name={data.name}
            price={data.price}
            key={data.name + data.id}
            id={data.name + data.id}
          />
        ))}
      </div>

      <div className="order__banner h-[400px] w-screen flex flex-col items-center justify-center">
        {/* <h1 className="section-title">Melt into your mouth</h1>
            <p className="p__opensans">what are you waiting for?</p> */}
      </div>

      <h1 className="section-title mb-[50px] my-[90px] text-center">
        Some Sweet Treats for you
      </h1>

      <ul
        className="flex items-center menuTitle mb-12 sm:space-x-[200px] space-x-[90px] 
      border-t-[1px] border-b-[1px]  border-color_golden cursor-pointer "
      >
        {data.orderTitleListTwo.map((title) => (
          <OrderTitleLists
            category={title.category}
            key={title.category + title.id}
            setSelected={setSecondSelected}
            active={secondSelected === title.category}
          />
        ))}
      </ul>

      <div className="flex flex-col 2xl:flex-row justify-center items-center  lg:mb-[100px]">
        {secondData.map((data) => (
          <OrderItem
            image={data.img}
            alt={data.alt}
            desc={data.desc}
            name={data.name}
            price={data.price}
            key={data.name + data.id}
            id={data.name + data.id}
          />
        ))}
      </div>
    </div>
  );
}

export default OrderBody;

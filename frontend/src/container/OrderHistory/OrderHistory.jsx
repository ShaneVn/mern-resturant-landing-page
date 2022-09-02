import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loadingState, userState } from "../../atoms/atoms";
import displayError from "../../utils/displayError";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function OrderHistory() {
  const [isloading, setIsloading] = useRecoilState(loadingState);
  const [user, setUser] = useRecoilState(userState);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/order/history", {
          headers: { authorization: `Bearer ${user.token}` },
        });
        setOrders(data);
      } catch (error) {
        navigate("/");
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="h-screen  flex flex-col section__padding w-full">
      <h1 className="section-title text-color_black mt-[4rem] mb-10 text-center">
        Order History
      </h1>
      <div class="overflow-x-auto relative">
        <table class="w-full text-lg text-left text-color_black dark:text-gray-400 ">
          <thead class="text-lg  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                Order ID
              </th>
              <th scope="col" class="py-3 px-6">
                Date of Order
              </th>
              <th scope="col" class="py-3 px-6">
                Price
              </th>
              <th scope="col" class="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {order._id}
                </th>
                <td class="py-4 px-6">{order.createdAt.substring(0, 10)}</td>
                <td class="py-4 px-6">${order.grandTotal.toFixed(2)}</td>
                <td class="py-4 px-6">Details</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <table className="text-white text-lg w-full ">
        <thead>
          <tr className="">
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        
        <tbody className="">
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>${order.grandTotal.toFixed(2)}</td>
              <td>Details</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}

export default OrderHistory;

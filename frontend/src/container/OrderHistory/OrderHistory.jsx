import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loadingState, userState } from "../../atoms/atoms";
import displayError from "../../utils/displayError";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loading, PaginationContainer } from "../../components";

function OrderHistory() {
  const [isloading, setIsloading] = useRecoilState(loadingState);
  const [user, setUser] = useRecoilState(userState);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [orderPerPage, setOrderPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);

  // orders for current page
  const endOffset = itemOffset + orderPerPage;

  const currentOrder = orders.slice(itemOffset, endOffset);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }

    const fetchData = async () => {
      setIsloading(true);
      try {
        setIsloading(true);
        const { data } = await axios.get("/api/order/history", {
          headers: { authorization: `Bearer ${user.token}` },
        });
        setOrders(data);
        setIsloading(false);
      } catch (error) {
        setIsloading(false);
        toast.error(displayError(error));
        setUser(null);
        navigate("/signin");
      }
    };
    fetchData();
  }, [navigate]);

  if (isloading) {
    return <Loading />;
  }

  return (
    <div className="h-screen  flex flex-col section__padding w-full">
      <h1 className="section-title text-color_black mt-[4rem] mb-10 text-center">
        Order History
      </h1>

      <div className="overflow-x-auto relative">
        <table className="w-full text-lg text-left text-color_black dark:text-gray-400 ">
          <thead className="text-lg  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Order ID
              </th>
              <th scope="col" className="py-3 px-6">
                Date of Order
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOrder.map((order) => (
              <tr
                key={order._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {order._id}
                </th>
                <td className="py-4 px-6">
                  {order.createdAt.substring(0, 10)}
                </td>
                <td className="py-4 px-6">${order.grandTotal.toFixed(2)}</td>
                <td className="py-4 px-6">Details</td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationContainer
          orderPerPage={orderPerPage}
          totalOrders={orders.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setItemOffset={setItemOffset}
        />
      </div>
    </div>
  );
}

export default OrderHistory;

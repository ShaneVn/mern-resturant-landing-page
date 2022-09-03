import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IfUserSignIn from "./utils/IfUserSignIn";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  PaymentSuccess,
  Payment,
  OrderHistory,
  AboutUs,
  Chef,
  FindUs,
  Footer,
  Gallery,
  Header,
  Intro,
  Laurels,
  SpecialMenu,
  Order,
  OrderBody,
  PageNotFound,
  Location,
  Signup,
  CheckOut,
  Signin,
} from "./container";
import { Navbar, Loading } from "./components";
import { loadingState } from "./atoms/atoms";
import { useRecoilState } from "recoil";
import "./App.css";

const App = () => {
  const [isloading, setIsloading] = useRecoilState(loadingState);

  return (
    <div className="h-screen">
      <BrowserRouter>
        <ToastContainer position="bottom-left" limit={1} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Navbar />
                <Header />
                <AboutUs />
                <SpecialMenu />
                <Chef />
                <Intro />
                <Laurels />
                <Gallery />
                <FindUs />
                <Footer />
              </>
            }
          />

          <Route
            exact
            path="/order"
            element={
              <>
                <Navbar />
                <Order />
                <OrderBody />
                <Footer />
              </>
            }
          />

          <Route
            exact
            path="/checkout"
            element={
              <>
                <Navbar />
                <CheckOut />
                <Footer />
              </>
            }
          />

          <Route
            exact
            path="/checkout/payment"
            element={
              <>
                <Navbar />
                <Payment />
                <Footer />
              </>
            }
          />

          {/* if user is sign in redirect to home page instead */}
          <Route element={<IfUserSignIn />}>
            <Route
              element={
                <>
                  <Navbar />
                  <Signup />
                </>
              }
              path="/signup"
              exact
            />
            <Route
              exact
              path="/signin"
              element={
                <>
                  <Navbar />
                  <Signin />
                </>
              }
            />
          </Route>

          <Route
            exact
            path="/location"
            element={
              isloading ? (
                <Loading />
              ) : (
                <>
                  <Navbar />
                  <Location />
                  <Footer />
                </>
              )
            }
          />

          <Route
            exact
            path="/payment"
            element={
              isloading ? (
                <>
                  <Loading />
                </>
              ) : (
                <>
                  <Navbar />
                  <Payment />
                  <Footer />
                </>
              )
            }
          />

          <Route
            exact
            path="/payment/paymentsuccess"
            element={<PaymentSuccess />}
          />

          <Route
            exact
            path="/orderhistory"
            element={
              <>
                <Navbar />
                <OrderHistory />{" "}
              </>
            }
          />

          <Route
            path="*"
            element={
              <>
                <Navbar />
                <PageNotFound />
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IfUserSignIn from "./utils/IfUserSignIn";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer} from "react-toastify";
import {
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
} from "./container";
import { Navbar } from "./components";
import "./App.css";
import CheckOut from "./container/CheckOut/CheckOut";
import Payment from "./container/Payment/Payment";
import Signin from "./container/Signin/Signin";

const App = () => {
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
              <>
                <Navbar />
                <Location />
                <Footer />
              </>
            }
          />

          <Route
            exact
            path="/orderhistory"
            element={
              <>
                <Navbar />
                <OrderHistory />
                <Footer />
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

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
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
} from "./container";
import { Navbar } from "./components";
import "./App.css";
import CheckOut from "./container/CheckOut/CheckOut";
import Payment from "./container/Payment/Payment";
import Signin from "./container/Signin/Signin";

const App = () => (
  <div className="h-screen">
    <BrowserRouter>
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

        <Route
          exact
          path="/signin"
          element={
            <>
              <Navbar />
              <Signin />
              <Footer />
            </>
          }
        />

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

export default App;

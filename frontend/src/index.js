import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import "./index.css";
import App from "./App";

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);
const root = ReactDOM.createRoot(document.getElementById("root"));



root.render(
  <RecoilRoot>
    <Elements stripe={stripePromise}>
    <App />
    </Elements>
  </RecoilRoot>
);

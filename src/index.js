import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "react-query";
import smoothscroll from "smoothscroll-polyfill";

const queryClinet = new QueryClient();

smoothscroll.polyfill();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClinet}>
    <App />
  </QueryClientProvider>
);

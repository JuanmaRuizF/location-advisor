import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import FavPlaces from "./FavPlaces";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<App />} />
  //       <Route path="*" element={<App />} />
  //       <Route path="/favourite" element={<FavPlaces />} />
  //     </Routes>
  //   </BrowserRouter>
  <App></App>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

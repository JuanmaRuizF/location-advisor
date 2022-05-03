import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";
import App from "./App";
import FavPlaces from "./Components/FavPlacesComponent/index";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    {/* <BrowserRouter> */}
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="*" element={<App />} />
      <Route path="/favourite" element={<FavPlaces />} />
    </Routes>
    {/* </BrowserRouter> */}
  </HashRouter>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap";
import reportWebVitals from "./reportWebVitals";
import store from "./DataStore/Store";
import { Provider } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();

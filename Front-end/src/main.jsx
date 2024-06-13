import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import axios from "axios";
// const Api_path = import.meta.env.VITE_API_PATH;
// const data = await axios.get(`${Api_path}/package/detail`);
// console.log(data);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "~/components/GlobalStyles";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </React.StrictMode>
);

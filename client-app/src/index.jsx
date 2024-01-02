import React from "react";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.min.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import "semantic-ui-css/semantic.min.css";
import "./app/layout/styles.css";
import { router } from "./app/router/Route";
import { store, StoreContext } from "./app/stores/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </React.StrictMode>
);

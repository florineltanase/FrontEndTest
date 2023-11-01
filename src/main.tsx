import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { RouterProvider } from "react-router-dom";
import { store } from "./app/store.ts";

import router from "./routes/routes.tsx";

import { StyledEngineProvider } from "@mui/material/styles";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <RouterProvider router={router} />
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./scss/app.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { Cart } from "./pages";
import { NotFoundBlock } from "./components/NotFoundBlock";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "*",
    element: <NotFoundBlock />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

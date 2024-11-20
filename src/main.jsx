import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./scss/app.scss";
import "./scss/global.scss"
import { Cart, Home } from "./pages";
import { NotFoundBlock } from "./components/NotFoundBlock";
import { FullPizza } from "./pages/FullPizza.jsx";
import { App } from "./App.jsx";

const router = createBrowserRouter( [
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "/cart",
        element: <Cart/>,
      },
      {
        path: "*",
        element: <NotFoundBlock/>,
      },
      {
        path: "pizza/:id",
        element: <FullPizza/>
      }
    ]
  }

] );
createRoot( document.getElementById( "root" ) ).render(
  <StrictMode>
    <Provider store={ store }>
      <RouterProvider router={ router }/>
    </Provider>
  </StrictMode>
);

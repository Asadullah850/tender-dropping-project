import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import AddPost from "./Components/Seller/AddPost";
import ProductBitBoard from "./Components/Bayer/ProductBitBoard";
import TenderDropperPage from "./Components/Bayer/TenderDropperPage";
import Dashboard from "./Components/Dashboard";
import SellerReport from "./Components/Seller/SellerReport";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/bitBoard",
        element: <ProductBitBoard />,
      },
      {
        path: "/sellerreport",
        element: <SellerReport />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
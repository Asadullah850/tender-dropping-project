import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import AddPost from "./Components/AddPost";
import ProductBitBoard from "./Components/ProductBitBoard";
import TenderDropperPage from "./Components/TenderDropperPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <AddPost />,
      },
      {
        path: "/bitBoard",
        element: <ProductBitBoard />,
      },
      {
        path: "/caller",
        element: <TenderDropperPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
import React from "react";
import ReactDOM from "react-dom/client";
import LogIn from "./pages/LogIn";
import CreateUser from "./pages/Createuser";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Routines from "./pages/Routines";
import Yoga from "./pages/Yoga";
import Exercises from "./pages/Exercises";
import StartExercises from "./pages/StartExercises";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "/LogIn",
    element: <LogIn />,
  },
  {
    path: "/CreateUser",
    element: <CreateUser />,
  },
  {
    path: "/Routines",
    element: <Routines />,
  },
  {
    path: "/Yoga",
    element: <Yoga />,
  },
  {
    path: "/Exercises",
    element: <Exercises />,
  },
  {
    path: "/StartExercises",
    element: <StartExercises />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

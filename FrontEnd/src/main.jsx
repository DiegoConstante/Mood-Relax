import React from "react";
import ReactDOM from "react-dom/client";
import IniciarSesion from "./pages/IniciarSesion";
import CrearCuenta from "./pages/CrearCuenta";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Ejercicios from "./pages/Ejercicios";
import RutinasEM from "./pages/RutinasEM";
import InicarEjercicios from "./pages/IniciarEjercicios";
import PerfilDeUsuario from "./pages/PerfilDeUsuario";
import DescripcionDeEjercicios from "./pages/DescripcionDeEjercicios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IniciarSesion />,
  },
  {
    path: "/IniciarSesion",
    element: <IniciarSesion />,
  },
  {
    path: "/CrearCuenta",
    element: <CrearCuenta />,
  },
  {
    path: "/Ejercicios",
    element: <Ejercicios />,
  },
  {
    path: "/RutinasEM",
    element: <RutinasEM />,
  },
  {
    path: "/DescripcionDeEjercicios/:id",
    element: <DescripcionDeEjercicios />,
  },
  {
    path: "/IniciarEjercicios/:id",
    element: <InicarEjercicios />,
  },
  {
    path: "/PerfilDeUsuario",
    element: <PerfilDeUsuario />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

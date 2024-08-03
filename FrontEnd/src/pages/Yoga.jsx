import React from "react";
import "../styles/Yoga.css";
import { Link } from "react-router-dom";

function handleMouseEnter() {
  const item = document.querySelector(".item");
  if (item) {
    item.style.backgroundColor = "#f0f0f0";
  }
}

function handleMouseLeave() {
  const item = document.querySelector(".item");
  if (item) {
    item.style.backgroundColor = "#ffffff";
  }
}

function Yoga() {
  return (
    <div className="yoga-App">
      <div className="image-container">
        <div className="item">
          <img
            src="https://cdn.static.aptavs.com/imagenes/estiramientos-musculares-tipos-beneficios-y-cuando-hacerlos/estiramientos-musculares_905x603.jpg"
            alt="Imagen 1"
          />
          <button className="button">Estiramientos</button>
        </div>
        <div className="item">
          <img
            src="https://images.ecestaticos.com/gnBzw92jLNdX0ELHqXqKtdX71fM=/152x0:2173x1516/557x418/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Ffde%2F466%2Ff01%2Ffde466f01483ddb15a4d6d9d9cdd97ad.jpg"
            alt="Imagen 2"
          />
          <button className="button">Yoga Principiantes</button>
        </div>
        <div className="item">
          <img
            src="https://vidauniversitaria.uc.cl/images/contenidos/9278_yoga-hatha.jpg"
            alt="Imagen 3"
          />
          <button className="button">Yoga Intermedio</button>
        </div>
        <div className="item">
          <img
            src="https://vidauniversitaria.uc.cl/images/contenidos/9278_yoga-hatha.jpg"
            alt="Imagen 4"
          />
          <button className="button">Yoga Avanzado</button>
        </div>
      </div>
      <Link to="/Routines">
        <div className="bottom-button-container">
          <button className="bottom-button">Regresar al Menú</button>
        </div>
      </Link>
    </div>
  );
}

export default Yoga;

import { Link, useParams } from "react-router-dom";
import "../styles/DescripcionDEStyles.css";
import { useState, useEffect } from "react";
import axios from "axios";

function DescripcionDeEjercicios() {
  const { id } = useParams();
  const [ejercicios, setEjercicios] = useState(null);

  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/ejercicios/${id}`
        );
        setEjercicios(response.data);
      } catch (error) {
        console.error("Error al obtener los ejercicios:", error);
      }
    };

    fetchEjercicios();
  }, [id]);

  if (!ejercicios) return <div>No se encontró el ejercicio.</div>;

  return (
    <div className="exercises-app">
      <div className="exercises-title">
        <Link to={"/Ejercicios"} className="link-title">
          <div className="exercises-logo">Mood Relax</div>
        </Link>
        <div className="exercises-page-info">
          <Link to={"/Ejercicios"} className="link-title">
            <div className="exercises-page">Rutinas</div>
          </Link>
          <div className="exercises-page" id="exercises-page-in">
            {ejercicios.nombre}
          </div>
        </div>
      </div>
      <div className="exercises-info">
        <button className="exercises-info-button">Ejercicios</button>
      </div>
      <div className="exercises-description">
        <div className="exercises-img">
          <img
            className="img"
            src={ejercicios.imagen_url}
            alt={ejercicios.nombre}
          />
          <div className="exercises-selected">{ejercicios.nombre}</div>
        </div>
        <div className="exercises-text">
          <div className="exercises-text-description">
            {ejercicios.descripcion}
          </div>
          <div className="exercises-button">
            <Link to={`/IniciarEjercicios/${id}`}>
              <button className="exercises-button-start">
                Empezar Ejercicios
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DescripcionDeEjercicios;

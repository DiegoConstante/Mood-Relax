import { Link } from "react-router-dom";
import "../styles/EjerciciosStyles.css";

function Ejercicios() {
  return (
    <div className="routines-app">
      <div className="routines-title">
        <Link to={"/RutinasEM"} className="link-title">
          <div className="routines-logo">Mood Relax</div>
        </Link>
      </div>
      <div className="routines-info">
        <button className="routines-info-button">
          Seleccione una rutina para empezar
        </button>
      </div>
      <div className="routines-options">
        <div className="left-column">
          <Link
            to={"/DescripcionDeEjercicios/1?tipo=YogaAvanzado"}
            className="link"
          >
            <button>Yoga Avanzado</button>
          </Link>
          <Link
            to={"/DescripcionDeEjercicios/3?tipo=PosturasAntiEstres"}
            className="link"
          >
            <button>Posturas Anti Estrés</button>
          </Link>
          <Link
            to={"/DescripcionDeEjercicios/5?tipo=EjerciciosCardiovasculares"}
            className="link"
          >
            <button>Ejercicios Cardiovasculares</button>
          </Link>
        </div>
        <div className="right-column">
          <Link
            to={"/DescripcionDeEjercicios/2?tipo=YogaPrincipiantes"}
            className="link"
          >
            <button>Yoga Principiantes</button>
          </Link>
          <Link
            to={"/DescripcionDeEjercicios/4?tipo=EjerciciosDeEstiramiento"}
            className="link"
          >
            <button>Ejercicios de Estiramiento</button>
          </Link>
          <Link to={"/PerfilDeUsuario"} className="link">
            <button className="saved-exercises">Perfil</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Ejercicios;

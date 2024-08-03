import { Link } from "react-router-dom";
import "../styles/Routines.css";

function Routines() {
  return (
    <div className="routines-app">
      <div className="routines-title">
        <Link to="/Yoga" className="link-title">
          <div className="routines-logo">Mood Relax</div>
        </Link>
      </div>
      <div className="routines-info">
        <button className="routines-info-button">
          Selecione una rutina para empezar
        </button>
      </div>
      <div className="routines-options">
        <Link to="/Exercises" className="link">
          <div className="left-column">
            <button>Yoga Avanzado</button>
            <button>Posturas para combatir el estres </button>
            <button>Ejercicios Cardiovasculares</button>
          </div>
        </Link>
        <Link to="/Exercises" className="link">
          <div className="right-column">
            <button>Yoga Principiantes</button>
            <button>Ejercicios de Estiramiento</button>
            <Link to="/Profile" className="link">
              <button className="saved-exercises">Perfil</button>
            </Link>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Routines;

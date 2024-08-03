import { Link } from "react-router-dom";
import "../styles/StartExercises.css";

function StartExercises() {
  return (
    <div className="start-app">
      <div className="start-title">
        <Link to={"/routines"} className="link-title-start">
          <div className="start-logo">Mood Relax</div>
        </Link>
        <div className="start-page-info">
          <Link to={"/routines"} className="link-title-start">
            <div className="start-page">Rutinas</div>
          </Link>
          <Link to={"/exercises"} className="link-title-start">
            <div className="start-page">Yoga Avanzado</div>
          </Link>
          <div className="start-page" id="exercises-page-in">
            Ejercicios
          </div>
        </div>
      </div>
      <div className="start-info">
        <button className="start-info-button">Ejercicios</button>
      </div>
      <div className="start-description">
        <div className="start-img">
          <img className="img" src="https://i.imgur.com/RvBbB8J.png" />
        </div>
      </div>
    </div>
  );
}

export default StartExercises;

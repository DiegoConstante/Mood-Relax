import { Link } from "react-router-dom";
import "../styles/DescripcionDEStyles.css";

function PosturasAntiEstres() {
  return (
    <div className="exercises-app">
      <div className="exercises-title">
        <Link to={"/routines"} className="link-title">
          <div className="exercises-logo">Mood Relax</div>
        </Link>
        <div className="exercises-page-info">
          <Link to={"/routines"} className="link-title">
            <div className="exercises-page">Rutinas</div>
          </Link>
          <div className="exercises-page" id="exercises-page-in">
            Posturas Anti Estres
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
            src="https://images.ecestaticos.com/gnBzw92jLNdX0ELHqXqKtdX71fM=/152x0:2173x1516/557x418/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Ffde%2F466%2Ff01%2Ffde466f01483ddb15a4d6d9d9cdd97ad.jpg"
            alt="Imagen 2"
          />
          <div className="exercises-selected">Posturas Anti Estres</div>
        </div>
        <div className="exercises-text">
          <div className="exercises-text-description">
            Las posturas avanzadas de yoga ponen a prueba la agilidad mental y
            la determinación del practicante, ya que estas prácticas requieren
            que las extremidades y las articulaciones adopten posiciones y
            ángulos inusuales, lo que desafía el rango de movimiento regular
            (ROM) de las articulaciones y los músculos involucrados.
          </div>
          <div className="exercises-button">
            <Link to={"/StartExercises"}>
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

export default PosturasAntiEstres;

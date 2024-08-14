import { Link, useParams } from "react-router-dom";
import "../styles/IniciarEjerciciosStyles.css";
import { useState, useEffect } from "react";
import axios from "axios";

function IniciarEjercicios() {
  const { id } = useParams();
  const [ejercicios, setEjercicios] = useState(null);
  const [selectedEjercicio, setSelectedEjercicio] = useState(null);
  const [time, setTime] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [repeticiones, setRepeticiones] = useState(0);
  const [listaEjercicios, setListaEjercicios] = useState([]);

  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        // Obtener los detalles del ejercicio actual
        const response = await axios.get(
          `http://localhost:3001/api/ejercicios/${id}`
        );

        if (response.status !== 200) {
          throw new Error(
            `Error al obtener el ejercicio: ${response.statusText}`
          );
        }

        setEjercicios(response.data);

        // Determinar la tabla correcta en función del id u otro criterio
        let tabla = "";
        switch (id) {
          case "1":
            tabla = "Yoga Avanzado";
            break;
          case "2":
            tabla = "Yoga Principiante";
            break;
          case "3":
            tabla = "Posturas Anti Estrés";
            break;
          case "4":
            tabla = "Ejercicios Estiramiento";
            break;
          case "5":
            tabla = "Ejercicios Cardiovasculares";
            break;
          default:
            throw new Error("ID de ejercicio no válido");
        }

        // Obtener la lista de ejercicios de la tabla correspondiente
        const listaResponse = await axios.get(
          `http://localhost:3001/api/ejerciciosPorTipo`,
          { params: { tipo: tabla } }
        );

        if (listaResponse.status !== 200) {
          throw new Error(
            `Error al obtener la lista de ejercicios: ${listaResponse.statusText}`
          );
        }

        setListaEjercicios(listaResponse.data);

        // Seleccionar el primer ejercicio automáticamente
        if (listaResponse.data.length > 0) {
          const primerEjercicio = listaResponse.data[0];
          setSelectedEjercicio(primerEjercicio);
          setTime(primerEjercicio.tiempo_segundos || 0); // Establecer tiempo del ejercicio seleccionado
          setRepeticiones(0);
        }

        // Establecer el tiempo en base al ejercicio seleccionado
        setTime(response.data.duracion_minutos * 60 || 0); // Convertir minutos a segundos
      } catch (error) {
        console.error(
          "Error al obtener los ejercicios:",
          error.response?.data || error.message
        );
      }
    };

    fetchEjercicios();
  }, [id]);

  useEffect(() => {
    let timer;
    if (isCounting && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (
      time === 0 &&
      repeticiones < (selectedEjercicio?.repeticiones || 0)
    ) {
      setRepeticiones((prevReps) => prevReps + 1);
      setTime(selectedEjercicio?.tiempo_segundos || 0); // Reiniciar el contador de tiempo
    } else if (repeticiones >= (selectedEjercicio?.repeticiones || 0)) {
      setIsCounting(false); // Detener el contador cuando se alcanzan las repeticiones máximas
    }
    return () => clearInterval(timer);
  }, [isCounting, time, repeticiones, selectedEjercicio]);

  const startCountdown = () => {
    setIsCounting(true);
  };

  const pauseCountdown = () => {
    setIsCounting(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleEjercicioChange = (event) => {
    const ejercicioId = event.target.value;
    const selected = listaEjercicios.find(
      (ej) => ej.id === parseInt(ejercicioId)
    );
    setSelectedEjercicio(selected);
    setTime(selected?.tiempo_segundos || 0); // Establecer tiempo del ejercicio seleccionado
    setRepeticiones(0); // Reiniciar repeticiones
  };

  const lineBreaks = (text) => {
    return text
      .split(".")
      .filter((sentence) => sentence.trim() !== "")
      .map((sentence, index) => <p key={index}>{sentence.trim()}.</p>);
  };

  return (
    <div className="start-app">
      <div className="start-title">
        <Link to={"/Ejercicios"} className="link-title-start">
          <div className="start-logo">Mood Relax</div>
        </Link>
        <div className="start-page-info">
          <Link to={"/Ejercicios"} className="link-title-start">
            <div className="start-page">Rutinas</div>
          </Link>
          <Link
            to={`/DescripcionDeEjercicios/${id}`}
            className="link-title-start"
          >
            <div className="start-page">{ejercicios?.nombre}</div>
          </Link>
          <div className="start-page" id="exercises-page-in">
            Ejercicios
          </div>
        </div>
      </div>
      <div className="start-info">
        <button className="start-info-button">Ejercicios</button>
      </div>
      <div className="start-container">
        <div className="start-section">Selecciona otro ejercicio</div>
        <select
          className="start-options"
          onChange={handleEjercicioChange}
          value={selectedEjercicio?.id || ""}
        >
          <option value="" disabled>
            Selecciona un ejercicio
          </option>
          {listaEjercicios.map((ejercicio) => (
            <option key={ejercicio.id} value={ejercicio.id}>
              {ejercicio.nombreejercicio}
            </option>
          ))}
        </select>
        <div className="start-details-container">
          <div className="start-name-details">
            Recomendaciones
            <div className="start-recomendations">
              {selectedEjercicio?.recomendaciones &&
                lineBreaks(selectedEjercicio?.recomendaciones)}
            </div>
            Descripción
            <div className="start-description">
              {selectedEjercicio?.detallesejercicio &&
                lineBreaks(selectedEjercicio?.detallesejercicio)}
            </div>
          </div>
          <img
            className="start-image"
            src={selectedEjercicio?.imagen_url}
          ></img>
        </div>
        <div className="start-countdown-title">Tiempo</div>
        <div className="start-countdown-container">
          <div className="repetitions-section">
            <div className="start-rep-title">Repeticiones</div>
            <input
              type="text"
              value={repeticiones}
              readOnly
              className="start-rep-input"
            />
          </div>
          <div className="start-countdown">
            <div className="start-time-title">Tiempo</div>
            <input
              type="text"
              value={formatTime(time)}
              readOnly
              className="start-time-input"
            />
          </div>
        </div>
        <div className="start-buttons-container">
          <button onClick={pauseCountdown} className="start-button">
            Pausar
          </button>
          <button onClick={startCountdown} className="start-button">
            Iniciar
          </button>
        </div>
      </div>
    </div>
  );
}

export default IniciarEjercicios;

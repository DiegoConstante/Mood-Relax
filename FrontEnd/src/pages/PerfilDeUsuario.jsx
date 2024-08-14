import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/PerfilDeUsuarioStyles.css";
import { Link } from "react-router-dom";

function PerfilDeUsuario() {
  const [formData, setFormData] = useState({
    email: "",
    nombre: "",
    edad: "",
    pais: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await axios.get("http://localhost:3001/paises");
        setPaises(response.data);
      } catch (error) {
        console.error("Error al obtener los países:", error);
      }
    };

    fetchPaises();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/user", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Error fetching user data");
        if (error.response && error.response.status === 403) {
          setMessage("Acceso denegado. Por favor, verifica tus credenciales.");
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.email) {
      errors.email = "El email es requerido";
    }
    if (!formData.nombre) {
      errors.nombre = "El nombre de usuario es requerido";
    }
    if (!formData.edad) {
      errors.edad = "La edad es requerida";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3001/api/user",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessage("Perfil actualizado exitosamente");
      navigate("/PerfilDeUsuario");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error al actualizar el perfil");
    }
  };

  return (
    <div className="update-app">
      <div className="update-title">Editar Perfil</div>
      {message && <p className="update-message">{message}</p>}
      <form className="update-form" onSubmit={handleSubmit}>
        <div className="update-container">
          <label className="update-text">Correo Electrónico:</label>
          <input
            className="update-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="update-container">
          <label className="update-text">Nombre de Usuario:</label>
          <input
            className="update-input"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          {errors.nombre && <p>{errors.nombre}</p>}
        </div>
        <div className="update-container">
          <label className="update-text">Edad:</label>
          <input
            className="update-input"
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            required
          />
        </div>
        <div className="update-container">
          <label className="update-text">País</label>
          <select
            className="update-input"
            name="pais"
            value={formData.pais}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un país</option>
            {paises.map((pais) => (
              <option key={pais.ID} value={pais.ID}>
                {pais.NombrePais}
              </option>
            ))}
          </select>
          {errors.pais && <p>{errors.pais}</p>}
        </div>
        <button className="update-button" type="submit">
          Actualizar Perfil
        </button>
        <Link to={"/Ejercicios"}>
          <button className="update-button" type="button">
            Regresar
          </button>
        </Link>
      </form>
    </div>
  );
}

export default PerfilDeUsuario;

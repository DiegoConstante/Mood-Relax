import { useState, useEffect } from "react";
import "../styles/CrearCuentaStyles.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CrearUsuario() {
  const [formData, setFormData] = useState({
    email: "",
    nombre: "",
    contrasena: "",
    confirmContrasena: "",
    edad: "",
    pais: "",
  });

  const [paises, setPaises] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let errors = {};
    if (!formData.nombre) {
      errors.nombre = "El nombre de usuario es requerido";
    }
    if (!formData.email) {
      errors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "El correo electrónico no es válido";
    }
    if (!formData.contrasena) {
      errors.contrasena = "La contraseña es requerida";
    } else if (formData.contrasena.length < 6) {
      errors.contrasena = "La contraseña debe tener al menos 6 caracteres";
    }
    if (formData.contrasena !== formData.confirmContrasena) {
      errors.confirmContrasena = "Las contraseñas no coinciden";
    }
    if (!formData.edad) {
      errors.edad = "La edad es requerida";
    }
    if (!formData.pais) {
      errors.pais = "Seleccione un país";
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
      const response = await axios.post(
        "http://localhost:3001/users/register",
        formData
      );
      setMessage("Usuario registrado exitosamente.");
      navigate("/IniciarSesion");
    } catch (error) {
      setMessage(error.response.data.error || "Error al registrar el usuario.");
    }
  };

  return (
    <div className="register-app">
      <div className="register-title">Crear Cuenta</div>
      {message && <p className="createuser-message">{message}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register">
          <label className="register-label">Correo Electrónico</label>
          <input
            className="register-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="register">
          <label className="register-label">Nombre de Usuario</label>
          <input
            className="register-input"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          {errors.nombre && <p>{errors.nombre}</p>}
        </div>
        <div className="register">
          <label className="register-label">Contraseña</label>
          <input
            className="register-input"
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            required
          />
          {errors.contrasena && <p>{errors.contrasena}</p>}
        </div>
        <div className="register">
          <label className="register-label">Confirmar Contraseña</label>
          <input
            className="register-input"
            type="password"
            name="confirmContrasena"
            value={formData.confirmContrasena}
            onChange={handleChange}
          ></input>
          {errors.confirmContrasena && <p>{errors.confirmContrasena}</p>}
        </div>
        <div className="register">
          <label className="register-label">Edad</label>
          <input
            className="register-input"
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            required
          />
          {errors.edad && <p>{errors.edad}</p>}
        </div>
        <div className="register">
          <label className="register-label">País</label>
          <select
            className="register-input"
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
        <div className="register-buttons-container">
          <Link className="register-link" to={"/IniciarSesion"}>
            <button className="register-button-return">Regresar</button>
          </Link>
          <button className="register-button" type="submit">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearUsuario;

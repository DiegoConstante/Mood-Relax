import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/IniciarSesionStyles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function IniciarSesion() {
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({ email: "", contrasena: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.email) {
      errors.email = "El email es requerido";
    }
    if (!formData.contrasena) {
      errors.contrasena = "La contraseña es requerida";
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
        "http://localhost:3001/exercises/login", // Asegúrate de que esta URL sea la correcta
        formData
      );
      setMessage("Inicio de sesión exitoso");
      localStorage.setItem("token", response.data.token); // Almacena el token en el almacenamiento local
      navigate("/Ejercicios"); // Redirige al usuario a una página protegida
    } catch (error) {
      console.error("Error en el inicio de sesión:", error); // Agrega esta línea para más detalles en la consola
      setMessage(error.response.data.error || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-app">
      <div className="login-text">
        <div className="login-title">Mood Relax</div>
      </div>
      {message && <p className="login-message">{message}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-output">
          <label className="login-info-usuario">Correo Electrónico</label>
          <input
            className="login-username"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          ></input>
          {errors.email && <p className="login-error">{errors.email}</p>}
          <label className="login-info-contraseña">Contraseña</label>
          <input
            className="login-password"
            name="contrasena"
            type="password"
            value={formData.contrasena}
            onChange={handleChange}
            required
          />
        </div>
        {errors.contrasena && (
          <p className="login-error">{errors.contrasena}</p>
        )}
        <div className="login-buttons">
          <Link to={"/CrearCuenta"}>
            <button className="login-create">Crear Cuenta</button>
          </Link>
          <button className="login-login" type="submit">
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
}

export default IniciarSesion;

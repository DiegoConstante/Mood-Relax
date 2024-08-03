import React, { useState } from "react";
import "../styles/CreateUserStyles.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateUser() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    age: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let errors = {};
    if (!formData.username) {
      errors.username = "El nombre de usuario es requerido";
    }
    if (!formData.email) {
      errors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "El correo electrónico no es válido";
    }
    if (!formData.password) {
      errors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
    if (!formData.age) {
      errors.age = "La edad es requerida";
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
        "http://localhost:3001/users/register", // Asegúrate de que esta URL es correcta
        formData
      );
      setMessage("Usuario registrado exitosamente.");
      navigate("/LogIn"); // Usa navigate en lugar de history.push
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
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className="register">
          <label className="register-label">Contraseña</label>
          <input
            className="register-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className="register">
          <label className="register-label">Confirmar Contraseña</label>
          <input
            className="register-input"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          ></input>
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <div className="register">
          <label className="register-label">Edad</label>
          <input
            className="register-input"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          {errors.age && <p>{errors.age}</p>}
        </div>
        <div className="login-buttons-container">
          <Link to="/LogIn">
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

export default CreateUser;

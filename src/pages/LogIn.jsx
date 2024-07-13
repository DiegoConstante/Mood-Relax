import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/LogInStyles.css";

function LogIn() {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value.replace(/./g, "*"));
  };

  return (
    <div className="login-app">
      <div className="login-text">
        <div className="login-title">Mood Relax</div>
      </div>
      <div className="login-output">
        <div className="login-info-usuario">Nombre de usuario</div>
        <input className="login-username"></input>
        <div className="login-info-contraseña">Contraseña</div>
        <input
          type="password"
          className="login-password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="login-buttons">
        <Link to="/CreateUser">
          <button className="login-create">Crear Cuenta</button>
        </Link>
        <Link to={"/Routines"}>
          <button className="login-login">Ingresar</button>
        </Link>
      </div>
    </div>
  );
}

export default LogIn;

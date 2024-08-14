import jwt from "jsonwebtoken";
import client from "../config/moodRelaxBDD.js";

export const loginUser = async (req, res) => {
  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }

  try {
    const result = await client.query(
      "SELECT * FROM Usuarios WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Email o contraseña incorrectos" });
    }

    const user = result.rows[0];

    const passwordMatchResult = await client.query(
      "SELECT crypt($1, contrasena) = contrasena AS password_match FROM Usuarios WHERE email = $2",
      [contrasena, email]
    );

    const passwordMatch = passwordMatchResult.rows[0].password_match;

    if (!passwordMatch) {
      return res.status(401).json({ error: "Email o contraseña incorrectos" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_JWT_SECRET || "kennedy",
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

import UserStats from "../models/userStats.js";
import client from "../config/moodRelaxBDD.js";

export const registerUserMongoDB = async (req, res) => {
  const { email, nombre, contrasena, confirmContrasena, edad, pais } = req.body;

  if (!email || !nombre || !contrasena || !edad || !pais) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  if (contrasena !== confirmContrasena) {
    return res.status(400).json({ error: "Las contraseñas no coinciden" });
  }

  try {
    const result = await client.query(
      "SELECT * FROM Usuarios WHERE email = $1",
      [email]
    );

    if (result.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está registrado" });
    }

    await client.query(
      "INSERT INTO Usuarios (email, nombre, contrasena, edad, pais) VALUES ($1, $2, $3, $4, $5)",
      [email, nombre, contrasena, edad, pais]
    );

    const newUserStat = new UserStats({
      email,
      edad,
      pais,
    });

    console.log("Guardando en MongoDB:", newUserStat);
    await newUserStat.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

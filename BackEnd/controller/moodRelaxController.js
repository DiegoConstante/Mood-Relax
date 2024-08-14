import UserStats from "../models/userStats.js";
import client from "../config/moodRelaxBDD.js";

export const registerUser = async (req, res) => {
  const { email, nombre, contrasena, confirmContrasena, edad, pais } = req.body;

  if (!email || !nombre || !contrasena || !edad || !pais) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  if (contrasena !== confirmContrasena) {
    return res.status(400).json({ error: "La contraseña no coincide" });
  }

  try {
    // Verificar si el email ya está registrado
    const result = await client.query(
      "SELECT * FROM Usuarios WHERE email = $1",
      [email]
    );

    if (result.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está registrado" });
    }

    // Registrar usuario en PostgreSQL
    await client.query("SELECT insert_usuario($1, $2, $3, $4, $5)", [
      email,
      nombre,
      contrasena,
      edad,
      pais,
    ]);

    // Registrar estadísticas en MongoDB
    const userStat = new UserStats({
      email,
      edad,
      pais,
      fechaRegistro: new Date(),
    });

    await userStat.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getPaises = async (req, res) => {
  try {
    const result = await client.query('SELECT "ID", "NombrePais" FROM paises');
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener los países:", err.message);
    res.status(500).json({ error: "Error al obtener los países" });
  }
};

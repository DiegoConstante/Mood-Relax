import client from "../config/moodRelaxBDD.js";

export const registerUser = async (req, res) => {
  const { email, username, password, confirmPassword, age } = req.body;

  if (!email || !username || !password || !age) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "La contraseña no coinciden" });
  }

  try {
    const result = await client.query("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está registrado" });
    }

    await client.query(
      "INSERT INTO Users (email, username, password, age) VALUES ($1, $2, $3, $4)",
      [email, username, password, age]
    );
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

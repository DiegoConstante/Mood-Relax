import client from "../config/moodRelaxBDD.js";

export const getUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await client.query(
      "SELECT id, email, nombre, edad, pais FROM usuarios WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = result.rows[0];
    res.json(user);
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    res.status(500).json({ message: "Error al obtener los datos del usuario" });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.user.userId;
  const { email, nombre, edad, pais, password } = req.body;

  try {
    const result = await client.query("SELECT * FROM usuarios WHERE id = $1", [
      userId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = result.rows[0];

    const updateFields = [];
    const updateValues = [];

    if (email) {
      updateFields.push(`email = $${updateFields.length + 1}`);
      updateValues.push(email);
    }
    if (nombre) {
      updateFields.push(`nombre = $${updateFields.length + 1}`);
      updateValues.push(nombre);
    }
    if (edad) {
      updateFields.push(`edad = $${updateFields.length + 1}`);
      updateValues.push(edad);
    }
    if (pais) {
      updateFields.push(`pais = $${updateFields.length + 1}`);
      updateValues.push(pais);
    }

    if (updateFields.length === 0) {
      return res
        .status(400)
        .json({ message: "No se proporcionaron campos para actualizar" });
    }

    updateValues.push(userId);
    const updateQuery = `UPDATE usuarios SET ${updateFields.join(
      ", "
    )} WHERE id = $${updateValues.length}`;
    await client.query(updateQuery, updateValues);

    res.json({ message: "Perfil actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    res.status(500).json({ message: "Error al actualizar el perfil" });
  }
};

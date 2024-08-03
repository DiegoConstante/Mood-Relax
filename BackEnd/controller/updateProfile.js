import client from "../config/moodRelaxBDD.js";

export const getUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = result.rows[0];
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los datos del usuario" });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.user.userId;
  const { email, username, password, age } = req.body;

  try {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
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
    if (username) {
      updateFields.push(`username = $${updateFields.length + 1}`);
      updateValues.push(username);
    }
    if (password) {
      updateFields.push(`password = $${updateFields.length + 1}`);
      updateValues.push(password);
    }
    if (age) {
      updateFields.push(`age = $${updateFields.length + 1}`);
      updateValues.push(age);
    }

    if (updateFields.length === 0) {
      return res
        .status(400)
        .json({ message: "No se proporcionaron campos para actualizar" });
    }

    updateValues.push(userId);
    const updateQuery = `UPDATE users SET ${updateFields.join(
      ", "
    )} WHERE id = $${updateValues.length}`;
    await client.query(updateQuery, updateValues);

    res.json({ message: "Perfil actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el perfil" });
  }
};

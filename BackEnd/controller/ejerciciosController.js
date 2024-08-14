import client from "../config/moodRelaxBDD.js";

export const getEjercicios = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query(
      "SELECT * FROM ejercicios WHERE id = $1",
      [id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Ejercicio no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el ejercicio:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

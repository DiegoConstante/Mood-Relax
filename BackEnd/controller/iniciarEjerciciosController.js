import client from "../config/moodRelaxBDD.js";

export const getEjerciciosPorTipo = async (req, res) => {
  const { tipo } = req.query;

  let query = "";

  if (tipo === "Yoga Avanzado") {
    query = "SELECT * FROM yogaAvanzado";
  } else if (tipo === "Yoga Principiante") {
    query = "SELECT * FROM yogaPrincipiantes";
  } else if (tipo === "Posturas Anti Estrés") {
    query = "SELECT * FROM posturasAntiEstres";
  } else if (tipo === "Ejercicios Estiramiento") {
    query = "SELECT * FROM ejerciciosDeEstiramiento";
  } else if (tipo === "Ejercicios Cardiovasculares") {
    query = "SELECT * FROM ejerciciosCardiovasculares";
  } else {
    return res.status(400).json({ error: "Tipo de ejercicio no válido" });
  }

  try {
    const result = await client.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(`Error al obtener ejercicios de ${tipo}:`, error);
    res.status(500).json({ error: `Error al obtener ejercicios de ${tipo}` });
  }
};

export const getEjercicioPorTipoYId = async (req, res) => {
  const { tipo, id } = req.params;

  let query = "";

  if (tipo === "Yoga Avanzado") {
    query = "SELECT * FROM yogaAvanzado WHERE id = $1";
  } else if (tipo === "Yoga Principiante") {
    query = "SELECT * FROM yogaPrincipiante WHERE id = $1";
  } else {
    return res.status(400).json({ error: "Tipo de ejercicio no válido" });
  }

  try {
    const result = await client.query(query, [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Ejercicio no encontrado" });
    }
  } catch (error) {
    console.error(`Error al obtener ejercicio de ${tipo} con ID ${id}:`, error);
    res.status(500).json({ error: `Error al obtener ejercicio de ${tipo}` });
  }
};

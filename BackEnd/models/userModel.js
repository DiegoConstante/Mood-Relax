import client from "../config/moodRelaxBDD.js";

const User = {
  findByEmail: async (email) => {
    try {
      const result = await client.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error al buscar usuario por email:", error);
      throw new Error("Error al buscar usuario por email");
    }
  },

  create: async (user) => {
    const { email, nombre, contrasena, edad, pais } = user;
    try {
      await client.query(
        "INSERT INTO users (email, username, password, age, pais) VALUES ($1, $2, $3, $4, $5)",
        [email, nombre, contrasena, edad]
      );
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw new Error("Error al crear usuario");
    }
  },
};

export default User;

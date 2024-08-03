import express from "express";
import client from "./config/moodRelaxBDD.js";
import cors from "cors";
import router from "./routes/registro.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", router);
app.use("/exercises", router);
app.use("/api", router);

client
  .connect()
  .then(() => {
    console.log("Conectado a la base de datos PostgreSQL");
    app.listen(3001, () => {
      console.log(`Servidor corriendo en el puerto 3001`);
    });
  })
  .catch((error) => {
    console.error("No se pudo conectar a la base de datos:", error);
  });

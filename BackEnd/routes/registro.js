import express from "express";
import { getPaises, registerUser } from "../controller/moodRelaxController.js";
import { loginUser } from "../controller/logInController.js";
import { updateUser, getUser } from "../controller/updateProfile.js";
import authenticateToken from "../middlewares/updateUserValidation.js";
import { getEjercicios } from "../controller/ejerciciosController.js";
import {
  getEjerciciosPorTipo,
  getEjercicioPorTipoYId,
} from "../controller/iniciarEjerciciosController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", authenticateToken, getUser);
router.put("/user", authenticateToken, updateUser);
router.get("/paises", getPaises);
router.get("/ejercicios/:id", getEjercicios);
router.get("/ejerciciosPorTipo", getEjerciciosPorTipo, getEjercicioPorTipoYId);

export default router;

import express from "express";
import { registerUser } from "../controller/moodRelaxController.js";
import { loginUser } from "../controller/logIncontroller.js";
import { updateUser, getUser } from "../controller/updateProfile.js";
import authenticateToken from "../middlewares/updateUserValidation.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", authenticateToken, getUser);
router.put("/user", authenticateToken, updateUser);

export default router;

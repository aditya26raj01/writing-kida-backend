import { Router } from "express";
const router = Router();
import { body } from "express-validator";
import addAdmin from "../Controllers/Admin/AddAdmin.js";
import { verifyAccessToken } from "../Helpers/jwt.js";
import { verifyRole } from "../Helpers/verifyRole.js";

router.post("/add-admin", verifyAccessToken, verifyRole("ADMIN"), [
    body("email").trim().isEmail().withMessage("Email Valid Email").normalizeEmail().toLowerCase(),
], addAdmin);

export default router;
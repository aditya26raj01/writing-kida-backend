import { Router } from "express";
const router = Router();
import { body } from "express-validator";
import addAdmin from "../Controllers/Admin/AddAdmin.js";
import { verifyAccessToken } from "../Helpers/jwt.js";
import { verifyRole } from "../Helpers/verifyRole.js";
import addCategory from "../Controllers/Admin/AddCategory.js";

router.post("/add-admin", verifyAccessToken, verifyRole("ADMIN"), [
    body("email").trim().isEmail().withMessage("Enter Valid Email").normalizeEmail().toLowerCase(),
], addAdmin);

router.post("/add-category", verifyAccessToken, verifyRole("ADMIN"), [
    body("category").notEmpty().withMessage("Enter Valid Category"),
], addCategory);

export default router;
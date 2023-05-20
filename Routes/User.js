import { Router } from "express";
const router = Router();
import { body } from "express-validator";

const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

import signup from "../Controllers/Auth/Signup.js";
import login from "../Controllers/Auth/Login.js";

router.post("/signup", [
    body("firstName").notEmpty().withMessage("Enter First Name").toUpperCase(),
    body("lastName").notEmpty().withMessage("Enter Last Name").toUpperCase(),
    body("userName").notEmpty().withMessage("Enter Valid User Name").toLowerCase(),
    body("email").trim().isEmail().withMessage("Email Valid Email").normalizeEmail().toLowerCase(),
    body("phone").matches(phoneRegex).withMessage("Invalid Phone Number"),
    body("location").notEmpty().withMessage("Enter Location").toUpperCase(),
    // body("profileImage").notEmpty().withMessage("Upload Valid Profile Image"),
    body("password").matches(passwordRegex).withMessage("Password must contain minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
], signup);

router.post("/login", [
    body("login").notEmpty(),
    body("password").matches(passwordRegex).withMessage("Password must contain minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
], login);


export default router;
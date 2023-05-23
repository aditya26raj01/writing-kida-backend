import { Router } from "express";
const router = Router();
import { body } from "express-validator";

const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

import signup from "../Controllers/Auth/Signup.js";
import login from "../Controllers/Auth/Login.js";
import getCategory from "../Controllers/Blog/GetCategory.js";
import { verifyAccessToken } from "../Helpers/jwt.js";
import { verifyRole } from "../Helpers/verifyRole.js";
import postBlog from "../Controllers/Blog/Post.js";
import getBlogs from "../Controllers/Blog/GetBlogs.js";
import getUserBlogs from "../Controllers/Blog/GetUserBlogs.js";
import refreshToken from "../Controllers/Auth/refresh.js";
import getBlog from "../Controllers/Blog/GetBlog.js";

router.post("/signup", [
    body("firstName").notEmpty().withMessage("Enter First Name").toUpperCase(),
    body("lastName").notEmpty().withMessage("Enter Last Name").toUpperCase(),
    body("userName").notEmpty().withMessage("Enter Valid User Name").toLowerCase(),
    body("email").trim().isEmail().withMessage("Email Valid Email").normalizeEmail().toLowerCase(),
    body("phone").matches(phoneRegex).withMessage("Invalid Phone Number"),
    body("location").notEmpty().withMessage("Enter Location").toUpperCase(),
    body("profileImage").notEmpty().withMessage("Upload Valid Profile Image"),
    body("password").matches(passwordRegex).withMessage("Password must contain minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
], signup);

router.post("/login", [
    body("login").notEmpty().withMessage("Enter Valid Login Credentials"),
    body("password").matches(passwordRegex).withMessage("Password must contain minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
], login);

router.post("/post-blog", verifyAccessToken, verifyRole("USER"), [
    body("title").isLength({ min: 20 }).withMessage("Min 20 Max 50 Characters - Title"),
    body("tag").notEmpty().withMessage("Enter Valid Tag"),
    body("description").isLength({ min: 20 }).withMessage("Min 20 Max 100 Characters - Description"),
    body("content").isLength({ min: 100 }).withMessage("Min 100 Characters - Content"),
    body("coverImage").notEmpty().withMessage("Upload Valid Cover Image"),
    body("featured").notEmpty().withMessage("Enter Valid Featuring Status"),
], postBlog);

router.get("/get-categories", getCategory);

router.get("/get-blogs", getBlogs);

router.get("/get-user-blogs", verifyAccessToken, verifyRole("USER"), getUserBlogs);

router.post("/refresh-token",refreshToken);

router.get("/get-blog/:id",verifyAccessToken, verifyRole("USER"), getBlog);

export default router;
import User from "../../Models/User.js";
import { validationResult } from 'express-validator';
import createError from 'http-errors';
import bcryptjs from "bcryptjs";
import { signAccessToken, signRefreshToken } from "../../Helpers/jwt.js";

const login = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            var error = []
            errors.array().forEach(err => {
                error.push(err.msg)
            })
            throw createError(400, 'Bad Request', { msg: error });
        }
        const { login, password } = req.body;
        
        var user = await User.findOne({ userName: login });
        if(!user) {
            user = await User.findOne({ email: login });
            if(!user) {
                user = await User.findOne({ phone: login });
                if (!user) throw createError(401, 'Unauthorized', { msg: "User Not Registered" });
                else throw createError(401, 'Unauthorized', { msg: "Use UserName or Email to Login" }); 
            }
        }

        const passwordCompare = await bcryptjs.compare(password, user.password);
        if (!passwordCompare) throw createError(401, 'Unauthorized', { msg: "Invalid password" })

        const accessToken = await signAccessToken(user);
        const refreshToken = await signRefreshToken(user);
        user = await User.findOne({ userName: login }).select("-_id -__v -password -createdAt");
        res.send({
            status: true,
            message: "Login Successfull",
            accessToken, refreshToken, user
        })

    } catch (error) {
        next(error);
    }
}

export default login;
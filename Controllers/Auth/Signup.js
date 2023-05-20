import User from "../../Models/User.js";
import { validationResult } from 'express-validator';
import createError from 'http-errors';
import bcryptjs from "bcryptjs";

const signup = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            var error = []
            errors.array().forEach(err => {
                error.push(err.msg)
            })
            throw createError(400, 'Bad Request', { msg: error });
        }
        const { firstName, lastName, userName, email, phone, location, password, profileImage } = req.body;
        
        const phoneExists = await User.findOne({ phone });
        const emailExists = await User.findOne({ email });
        const userNameExists = await User.findOne({ userName });

        if (phoneExists || emailExists) throw createError(409, 'Conflict', { msg: "User Already Registered" });
        if (userNameExists) throw createError(409, 'Conflict', { msg: "User Name taken, Try Another" });

        
        const salt = await bcryptjs.genSalt(10);
        const securedPassword = await bcryptjs.hash(password, salt);

        const user = await User.create({
            firstName, lastName, userName, email, phone, location, password: securedPassword, profileImage, createdAt: Date.now()
        })

        res.send({
            status: true,
            message: "Signup Successfull, Try Loggin In"
        })

    } catch (error) {
        next(error);
    }
}

export default signup;
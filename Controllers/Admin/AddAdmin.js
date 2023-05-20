import User from "../../Models/User.js";
import createError from 'http-errors';
import { validationResult } from 'express-validator';

const addAdminRole = (rolesArray) => {
    rolesArray.push("ADMIN");
    return rolesArray;
}

const addAdmin = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            var error = []
            errors.array().forEach(err => {
                error.push(err.msg)
            })
            throw createError(400, 'Bad Request', { msg: error });
        }
        const { email } = req.body;
        
        const user = await User.findOne({ email });

        if (!user) throw createError(401, 'Unauthorized', { msg: "User Not Registered" });
        
        if(user.roles.includes("ADMIN")) throw createError(409, 'Conflict', { msg: "User Already an Admin" });

        const userUpdated = await User.findOneAndUpdate({ email }, { roles: addAdminRole(user.roles) }, { returnOriginal: false });

        res.send({
            status: true,
            message: "Role Successfully Updated"
        })

    } catch (error) {
        next(error);
    }
}

export default addAdmin;
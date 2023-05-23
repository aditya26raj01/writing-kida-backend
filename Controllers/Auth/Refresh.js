import createError from "http-errors";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../Helpers/jwt.js";
import User from "../../Models/User.js";

export const refreshToken = async (req, res, next) => {
    try {
        var { refreshToken } = req.body;
        if (!refreshToken) throw createError(400, 'Bad Request', { msg: "Please provide all fields" });
        const userID = await verifyRefreshToken(refreshToken);
        var user = await User.findById(userID);
        const accessToken = await signAccessToken(user)
        var refreshToken = await signRefreshToken(user)
        user = await User.findById(userID).select("-_id -__v -password -createdAt");
        res.send({ 
            status: true,
            message: "Refresh Successfull",
            accessToken, refreshToken, user });
    } catch (error) {
        next(error);
    }
}
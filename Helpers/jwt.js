import JWT from "jsonwebtoken";
import createError from 'http-errors';
import dotenv from "dotenv";
dotenv.config();

const options = {
    expiresIn: "10m",
    issuer: "writingKida.admin"
}

export const signAccessToken = (user) => {
    return new Promise((resolve, reject) => {
        const payload = {
            sub: user._id,
            roles: user.roles,
            email: user.email
        }
        JWT.sign(payload, process.env.ACCESS_TOKEN_SCERET, options, (err, token) => {
            if (err) return reject(createError.InternalServerError());
            resolve(token);
        });
    })
}

export const signRefreshToken = (user) => {
    return new Promise((resolve, reject) => {
        const payload = {
            sub: user._id,
            roles: user.roles,
            email: user.email
        }
        JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET, options, (err, token) => {
            if (err) reject(createError.InternalServerError());
            resolve(token);
        })
    })
}

export const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized());
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SCERET, (err, payload) => {
        if (err) {
            const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message.toUpperCase();
            return next(createError(401, 'Unauthorized', { msg: message }));
        }
        req.payload = payload;
        next();
    });
}
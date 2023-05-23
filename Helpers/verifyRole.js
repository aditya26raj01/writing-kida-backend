import createError from 'http-errors';

export const verifyRole = (...allowedRole) => {
    return (req, res, next) => {
        if (!req.payload.roles) return next(createError.Unauthorized());
        const rolesArray = [...allowedRole];
        const result = req.payload.roles.map((role) => rolesArray.includes(role)).find(val => val == true);
        if (!result) return next(createError(401, 'Unauthorized', { msg: "Only Bloggers Can Post Blogs" }));
        next();
    }
}
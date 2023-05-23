import Category from '../../Models/Category.js';
import createError from 'http-errors';
import { validationResult } from 'express-validator';

const addCategory = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            var error = []
            errors.array().forEach(err => {
                error.push(err.msg)
            })
            throw createError(400, 'Bad Request', { msg: error });
        }
        const { category } = req.body;
        
        const categoryExists = await Category.findOne({ name: category });

        if (categoryExists) throw createError(401, 'Unauthorized', { msg: "Category Already Registered" });

        const categoryAdded = await Category.create({ name: category, createdAt: Date.now(), createdBy: req.payload.sub });

        res.send({
            status: true,
            message: "Category Successfully Registered"
        })

    } catch (error) {
        next(error);
    }
}

export default addCategory;
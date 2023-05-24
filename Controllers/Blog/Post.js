import Blog from '../../Models/Blog.js';
import { validationResult } from 'express-validator';
import createError from 'http-errors';

const postBlog = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            var error = []
            errors.array().forEach(err => {
                error.push(err.msg)
            })
            throw createError(400, 'Bad Request', { msg: error });
        }
        const { title, description, content, tag, coverImage, featured, inTop10 } = req.body;
        
        const blog = await Blog.create({
            title, description, content, tag, coverImage,
            postedAt: Date.now(),
            featured: featured || false,
            inTop10: inTop10 || false,
            author: req.payload.sub
        });

        res.send({
            status: true,
            message: "Blog Posted Successfully",
            blog
        })

    } catch (error) {
        next(error);
    }
}

export default postBlog;
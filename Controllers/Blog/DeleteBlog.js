import Blog from '../../Models/Blog.js';
import createError from 'http-errors';

const deletBlog = async (req, res, next) => {
    try {
        if(!req.params.id) throw createError(400, 'Bad Request', { msg: "Enter Valid Blog ID" });
        
        var blog = await Blog.findById(req.params.id);
        if(blog.author.toString() != req.payload.sub){
            throw createError.Unauthorized();
        }
        blog = await Blog.findByIdAndUpdate(req.params.id,{ deleted: true }, {returnOriginal: false});
        const blogs = await Blog.find({author: req.payload.sub, deleted: false}).sort({postedAt:-1}).select("-__v")
        res.send({
            status: true,
            message: "Blog Deleted Successfully",
            blogs
        })


    } catch (error) {
        next(error);
    }
}

export default deletBlog;
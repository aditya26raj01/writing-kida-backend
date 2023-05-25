import Blog from '../../Models/Blog.js';
import createError from 'http-errors';
import User from '../../Models/User.js';
import mongoose from 'mongoose';

const likeBlog = async (req, res, next) => {
    try {
        var user = await User.findById(req.payload.sub);
        var liked = false;
        user.likedBlogs.forEach(element => {
            if(element.blog.toString() === req.params.id){
                liked = true;
            }
        });
        if(liked){
            user = await User.findByIdAndUpdate(
                req.payload.sub,
                {$pull: {likedBlogs: { blog: new mongoose.Types.ObjectId(req.params.id) }}}
            );
            var blog = await Blog.findByIdAndUpdate(
                req.params.id,
                {$inc : {'likes' : -1}}, {returnOriginal: false}
            )
            return res.send({
                status: true,
                message: "Blog Unliked Successfully",
                blog
            })
        }
        var blog = await Blog.findById(req.params.id);
        if(blog){
            blog = await Blog.findByIdAndUpdate(req.params.id, {$inc : {'likes' : 1}}, {returnOriginal: false});
        }else{
            throw createError(400, 'Bad Request', { msg: "Blog Not Found" });
        }
        user = await User.findByIdAndUpdate(
            req.payload.sub,
            {$push: {likedBlogs: { blog: blog._id, likedAt: Date.now() }}}   
        )

        res.send({
            status: true,
            message: "Blog Liked Successfully",
            blog
        })

    } catch (error) {
        next(error);
    }
}

export default likeBlog;
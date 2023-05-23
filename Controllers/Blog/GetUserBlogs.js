import Blog from "../../Models/Blog.js";

const getUserBlogs = async (req, res, next) => {
    try {
        var blogs = await Blog.find({author: req.payload.sub}).select("-__v")
        res.send({
            status: true,
            message: "User Blogs Fetched Successfull",
            blogs
        })

    } catch (error) {
        next(error);
    }
}

export default getUserBlogs;
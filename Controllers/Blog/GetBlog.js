import mongoose from "mongoose";
import Blog from "../../Models/Blog.js";

const getBlog = async (req, res, next) => {
    try {
        var blog = await Blog.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "author"
                }
            }, 
            {$unwind: '$author'},
            {
                $project: {
                    title: 1,
                    tag: 1,
                    description: 1,
                    content: 1,
                    coverImage: 1,
                    featured: 1,
                    postedAt: 1,
                    _id: 1,
                    "author.firstName": 1,
                    "author.lastName": 1,
                    "author.userName": 1,
                    "author.profileImage": 1,
                    "author.email": 1,
                    "author.location": 1,
                }
            }
        ])
        res.send({
            status: true,
            message: "Blog Fetched Successfull",
            blog:blog[0]
        })

    } catch (error) {
        next(error);
    }
}

export default getBlog;
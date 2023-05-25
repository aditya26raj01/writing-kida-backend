import Blog from "../../Models/Blog.js";

const getTop10 = async (req, res, next) => {
    try {
        var top10Blogs = await Blog.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "author"
                }
            },
            { $match: { deleted: false, inTop10: true } },
            { $sort: { postedAt: -1 } },
            { $unwind: '$author' },
            {
                $project: {
                    title: 1,
                    tag: 1,
                    description: 1,
                    coverImage: 1,
                    featured: 1,
                    postedAt: 1,
                    _id: 1,
                    likes:1,
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
            message: "Blogs Fetched Successfull",
            blogs: top10Blogs
        })

    } catch (error) {
        next(error);
    }
}

export default getTop10;
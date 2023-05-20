import { model } from "mongoose";

const Blog = model("Blog", {
    title: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    postedAt: {
        type: Date
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
});

export default Blog;
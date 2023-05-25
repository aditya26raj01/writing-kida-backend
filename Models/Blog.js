import { Schema, model } from "mongoose";

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
    content: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    postedAt: {
        type: Date
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    deleted: {
        type: Boolean,
        default: false
    },
    featured: {
        type: Boolean,
        default: false
    },
    inTop10: {
        type: Boolean,
        default: false
    },
    stockMarket: {
        type: Boolean,
        default: false
    },
    likes: {
        type: Number,
        default: 0
    },
});

export default Blog;
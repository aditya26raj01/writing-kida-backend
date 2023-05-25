import { Schema, model } from "mongoose";

const User = model("User", {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: Array,
        default: ["USER"],
        require: true
    },
    createdAt: {
        type: Date
    },
    likedBlogs: [{
        blog:{
            type: Schema.Types.ObjectId,
            ref: "blogs"
        },
        likedAt: {
            type: Date
        },
        _id: false
    }]
});

export default User;
import { Schema, model } from "mongoose";

const Category = model("Category", {
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
});

export default Category;
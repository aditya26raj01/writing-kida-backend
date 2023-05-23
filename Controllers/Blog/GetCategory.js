import Category from '../../Models/Category.js';

const getCategory = async (req, res, next) => {
    try {
        var categories = await Category.find().select("-_id -__v -createdAt -createdBy");
        res.send({
            status: true,
            message: "Categories Fetched Successfull",
            categories
        })

    } catch (error) {
        next(error);
    }
}

export default getCategory;
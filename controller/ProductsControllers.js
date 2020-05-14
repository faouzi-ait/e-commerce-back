const Categories = require("../models/Categories");

exports.categories = async (req, res, next) => {
  try {
    const list = await Categories.find();

    return res.status(200).json({
      success: true,
      list,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "A problem has occured",
    });
  }
};

exports.createCategory = async (req, res, next) => {
  const { title, category, imageUrl, size, linkUrl } = req.body;

  const newCategory = new Categories({
    title,
    category,
    imageUrl,
    size,
    linkUrl,
  });

  try {
    const savedCategory = await newCategory.save();

    return res.status(200).json({
      success: true,
      message: "Category successfully saved",
      savedCategory,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "A problem has occured",
    });
  }
};

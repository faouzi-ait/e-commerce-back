const Categories = require("../models/Categories");
const Product = require("../models/Product");

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

exports.product = async (req, res, next) => {
  try {
    const product = await Product.find().populate("category");
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "A problem has occured",
    });
  }
};

exports.createProduct = async (req, res, next) => {
  const { name, imageUrl, price, category } = req.body;

  const newProduct = new Product({
    name,
    imageUrl,
    price,
    category,
  });

  try {
    const savedProduct = await newProduct.save();

    return res.status(200).json({
      success: true,
      message: "Product successfully saved",
      savedProduct,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "A problem has occured",
    });
  }
};

const mongoose = require("mongoose");

const Categories = mongoose.Schema(
  {
    title: {
      type: String,
      min: 2,
      maxlength: 100,
      required: true,
    },
    category: {
      type: String,
      min: 2,
      maxlength: 100,
      required: true,
    },
    imageUrl: {
      type: String,
      min: 2,
      maxlength: 100,
      required: true,
    },
    size: {
      type: String
    },
    linkUrl: {
      type: String,
      min: 2,
      maxlength: 100,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories", Categories);

const mongoose = require("mongoose");

const product = mongoose.Schema(
  {
    name: {
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
    price: {
      type: Number,
      min: 1,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", product);

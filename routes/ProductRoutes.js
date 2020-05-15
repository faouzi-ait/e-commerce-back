const router = require("express").Router();
const productController = require("../controller/ProductsControllers");

router.get("/product/items", productController.product);
router.post("/product/create", productController.createProduct);

router.get("/products", productController.categories);
router.post("/products/create", productController.createCategory);

module.exports = router;

const router = require("express").Router();

// const categories = require("./category-routes")

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require("../../controllers/api/products");

router.get("/api/products", getAllProducts);
router.get("/api/products/:id", getProductById);
router.post("/api/products", createProduct);
router.put("/api/products/:id", updateProductById);
router.delete("/api/products/:id", deleteProductById);

// router.use("/:categoryId/categories", categories)

module.exports = router;

const router = require("express").Router();

// const categories = require("./category-routes")

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require("../../controllers/api/products");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

// router.use("/:categoryId/categories", categories)

module.exports = router;

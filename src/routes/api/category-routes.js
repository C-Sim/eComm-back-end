const router = require("express").Router();

const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} = require("../../controllers/api/categories");

router.get("/api/categories", getAllCategories);
router.get("/api/categories/:id", getCategoryById);
router.post("/api/categories", createCategory);
router.put("/api/categories/:id", updateCategoryById);
router.delete("/api/categories/:id", deleteCategoryById);

module.exports = router;

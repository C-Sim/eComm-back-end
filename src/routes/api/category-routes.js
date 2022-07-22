const router = require("express").Router();

const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} = require("../../controllers/api/categories");

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategoryById);
router.delete("/:id", deleteCategoryById);

module.exports = router;

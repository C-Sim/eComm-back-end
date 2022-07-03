const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

const {
  getAllTags,
  getTagById,
  createTag,
  updateTagById,
  deleteTagById,
} = require("../../controllers/api/tags");

router.get("/api/tags", getAllTags);
router.get("/api/tags/:id", getTagById);
router.post("/api/tags", createTag);
router.put("/api/tags/:id", updateTagById);
router.delete("/api/tags/:id", deleteTagById);

module.exports = router;

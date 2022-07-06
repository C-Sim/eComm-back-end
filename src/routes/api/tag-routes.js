const router = require("express").Router();
// const { Tag, Product, ProductTag } = require("../../models");

const {
  getAllTags,
  getTagById,
  createTag,
  updateTagById,
  deleteTagById,
} = require("../../controllers/api/tags");

router.get("/", getAllTags);
router.get("/:id", getTagById);
router.post("/", createTag);
router.put("/:id", updateTagById);
router.delete("/:id", deleteTagById);

module.exports = router;

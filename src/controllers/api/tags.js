const { Tag, Product, ProductTag } = require("../../models");

const getAllTags = async (req, res) => {
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });

    return res.json({
      success: true,
      data: tags,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to get tags | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to get tags",
    });
  }
};

const getTagById = async (req, res) => {
  // be sure to include its associated Product data
  try {
    const { id } = req.params;

    const tag = await Tag.findOne({
      where: { id },
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });

    if (!tag) {
      console.log(`[ERROR]: Failed to find tag | No tag with id of ${id}`);

      return res.status(404).json({ error: "Failed to find tag" });
    }

    return res.json({
      success: true,
      data: tag,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to get tag | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to get tag",
    });
  }
};

const createTag = async (req, res) => {
  try {
    const { tag_name } = req.body;

    const tag = await Tag.findOne({ where: { tag_name } });

    if (tag) {
      console.log(
        `[ERROR]: Failed to create tag | Tag of ${tag_name} already exists`
      );

      return res.status(400).json({
        error: `Failed to create tag | Tag of ${tag_name} already exists`,
      });
    }

    const newTag = await Tag.create({
      tag_name,
    });

    return res.status(201).json({
      success: true,
      data: newTag,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to create tag | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to create tag",
    });
  }
};

const updateTagById = async (req, res) => {
  try {
    const { tag_name } = req.body;
    const { id } = req.params;

    const tag = await Tag.findOne({ where: { id } });

    const existingTag = await Tag.findOne({
      where: { tag_name },
    });

    if (!tag) {
      console.log(`[ERROR]: Failed to find tag | No tag with id of ${id}`);

      return res.status(404).json({ error: "Failed to find tag" });
    }

    if (existingTag) {
      console.log(
        `[ERROR]: Failed to update tag | Tag of ${tag_name} already exists`
      );

      return res
        .status(400)
        .json({
          error: `Failed to update tag | Tag of ${tag_name} already exists`,
        });
    }

    const updatedTag = await Tag.update(
      { tag_name },
      {
        where: { id },
      }
    );

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to update tag | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to update tag",
    });
  }
};

const deleteTagById = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.destroy({
      where: { id },
    });

    if (!tag) {
      console.log(`[ERROR]: Failed to find tag | No tag with id of ${id}`);

      return res.status(404).json({ error: "Failed to find tag" });
    }

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to delete tag | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to delete tag",
    });
  }
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTagById,
  deleteTagById,
};

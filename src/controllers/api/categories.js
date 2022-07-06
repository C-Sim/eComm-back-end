const { Category, Product } = require("../../models");

const getAllCategories = async (req, res) => {
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [Product],
    });

    return res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to get categories | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to get categories",
    });
  }
};

const getCategoryById = async (req, res) => {
  // be sure to include its associated Products
  try {
    const { id } = req.params;

    const category = await Category.findOne({
      where: { id },
      include: [Product],
    });

    if (!category) {
      console.log(
        `[ERROR]: Failed to find category | No category with id of ${id}`
      );

      return res.status(404).json({ error: "Failed to find category" });
    }

    return res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to get category | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to get category",
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    const category = await Category.findOne({ where: { category_name } });

    if (category) {
      console.log(
        `[ERROR]: Failed to create category | Category of ${category_name} already exists`
      );

      return res.status(400).json({ error: "Failed to create category" });
    }

    const newCategory = await Category.create({
      category_name,
    });

    return res.json({
      success: true,
      data: newCategory,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to create category | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to create category",
    });
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const { category_name } = req.body;
    const { id } = req.params;

    const category = await Category.findOne({ where: { id } });

    const existingCategory = await Category.findOne({
      where: { category_name },
    });

    if (!category) {
      console.log(
        `[ERROR]: Failed to find category | No category with id of ${id}`
      );

      return res.status(404).json({ error: "Failed to find category" });
    }

    if (existingCategory) {
      console.log(
        `[ERROR]: Failed to update category | Category of ${category_name} already exists`
      );

      return res.status(400).json({ error: "Failed to update category" });
    }

    const updatedCategory = await Category.update(
      { category_name },
      {
        where: { id },
      }
    );

    return res.json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to update category | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to update category",
    });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.destroy({
      where: { id },
    });

    if (!category) {
      console.log(
        `[ERROR]: Failed to find category | No category with id of ${id}`
      );

      return res.status(404).json({ error: "Failed to find category" });
    }

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to delete category | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to delete category",
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
};

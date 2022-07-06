const { Product, Category, Tag, ProductTag } = require("../../models");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    });

    return res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to get products | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to get products",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id },
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    });

    if (!product) {
      console.log(
        `[ERROR]: Failed to find product | No product with id of ${id}`
      );

      return res.status(404).json({ error: "Failed to find product" });
    }

    return res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to get product | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to get product",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { product_name, price, stock, category_id, tagIds } = req.body;

    const product = await Product.findOne({ where: { product_name } });

    if (product) {
      console.log(
        `[ERROR]: Failed to create product | Product of ${product_name} already exists`
      );

      return res.status(400).json({
        error: `Failed to create product | Product of ${product_name} already exists`,
      });
    }

    const newProduct = await Product.create({
      product_name,
      price,
      stock,
      category_id,
    });

    if (tagIds.length) {
      const productTags = tagIds.map((tag_id) => {
        return {
          product_id: newProduct.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTags);
    }

    return res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to create product | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to create product",
    });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { product_name, price, stock, category_id, tagIds } = req.body;
    const { id } = req.params;

    const product = await Product.findOne({ where: { id } });

    if (!product) {
      console.log(
        `[ERROR]: Failed to find product | No product with id of ${id}`
      );

      return res.status(404).json({ error: "Failed to find product" });
    }

    const updatedProduct = await Product.update(
      { product_name, price, stock, category_id, tagIds },
      {
        where: { id },
      }
    );

    const productTags = await ProductTag.findAll({
      where: { product_id: id },
    });

    const productTagIds = productTags.map(({ tag_id }) => tag_id);

    const newProductTags = tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: id,
          tag_id,
        };
      });

    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !tagIds.includes(tag_id))
      .map(({ id }) => id);

    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to update product | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to update product",
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.destroy({
      where: { id },
    });

    if (!product) {
      console.log(
        `[ERROR]: Failed to find product | No product with id of ${id}`
      );

      return res.status(404).json({ error: "Failed to find product" });
    }

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to delete product | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to delete product",
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};

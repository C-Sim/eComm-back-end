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

      return res.status(400).json({ error: "Failed to create product" });
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

    return res.status(200).json({
      success: true,
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

    // TODO change req.params.id x2 to id?
    // try {
    // find all associated tags from ProductTag
    const productTags = await ProductTag.findAll({
      where: { product_id: req.params.id },
    });

    console.log(productTags);

    // get list of current tag_ids
    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    // create filtered list of new tag_ids
    const newProductTags = tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });
    // figure out which ones to remove
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !tagIds.includes(tag_id))
      .map(({ id }) => id);

    // run both actions
    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);
    // } catch (error) {
    //   console.log(`[ERROR: Failed to update product tags | ${error.message}]`);
    //   return res.json({ success: true });
    // }

    // .then((updatedProductTags) => res.json(updatedProductTags))

    return res.json({
      success: true,
      data: updatedProduct,
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

// Starter code e.g.s

// // create new product

// const post = async (req, res) => {
//     /* req.body should look like this...
//       {
//         product_name: "Basketball",
//         price: 200.00,
//         stock: 3,
//         tagIds: [1, 2, 3, 4]
//       }
//     */
// Product.create(req.body)
//   .then((product) => {
//     // if there's product tags, we need to create pairings to bulk create in the ProductTag model
//     if (req.body.tagIds.length) {
//       const productTagIdArr = req.body.tagIds.map((tag_id) => {
//         return {
//           product_id: product.id,
//           tag_id,
//         };
//       });
//       return ProductTag.bulkCreate(productTagIdArr);
//     }
//     // if no product tags, just respond
//     res.status(200).json(product);
//   })
//   .then((productTagIds) => res.status(200).json(productTagIds));
//       .catch((err) => {
//         console.log(err);
//         res.status(400).json(err);
//       });
//   })

// update product

// const put = async (req, res) => {
//   // update product data
//   Product.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((product) => {
//       // find all associated tags from ProductTag
//       return ProductTag.findAll({ where: { product_id: req.params.id } });
//     })
//     .then((productTags) => {
//       // get list of current tag_ids
//       const productTagIds = productTags.map(({ tag_id }) => tag_id);
//       // create filtered list of new tag_ids
//       const newProductTags = req.body.tagIds
//         .filter((tag_id) => !productTagIds.includes(tag_id))
//         .map((tag_id) => {
//           return {
//             product_id: req.params.id,
//             tag_id,
//           };
//         });
//       // figure out which ones to remove
//       const productTagsToRemove = productTags
//         .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//         .map(({ id }) => id);

//       // run both actions
//       return Promise.all([
//         ProductTag.destroy({ where: { id: productTagsToRemove } }),
//         ProductTag.bulkCreate(newProductTags),
//       ]);
//     })
//     .then((updatedProductTags) => res.json(updatedProductTags))
//     .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//     });
// };

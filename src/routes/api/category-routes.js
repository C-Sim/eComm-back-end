const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // - /api/categories
  // - /api/products
  // - /api/tags
  // - if internal server error return a status code of 500
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  // - /api/categories/:id
  // - /api/products/:id
  // - /api/tags/:id
  // - if not found return a status of 404
  // - if internal server error return a status code of 500
});

router.post("/", (req, res) => {
  // create a new category
  // - /api/categories
  // - /api/products
  // - /api/tags
  // - validate the payload and if bad request return status code of 400
  // - if internal server error return a status code of 500
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  // - /api/categories/:id
  // - /api/products/:id
  // - /api/tags/:id
  // - validate the payload and if bad request return status code of 400
  // - if not found return a status of 404
  // - if internal server error return a status code of 500
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  // - /api/categories/:id
  // - /api/products/:id
  // - /api/tags/:id
  // - if not found return a status of 404
  // - if internal server error return a status code of 500
});

module.exports = router;

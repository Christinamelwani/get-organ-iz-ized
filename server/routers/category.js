const express = require("express");
const categoryRouter = express.Router();
const CategoryController = require("../controllers/categoryController");

categoryRouter.get("/", CategoryController.getCategories);

module.exports = categoryRouter;

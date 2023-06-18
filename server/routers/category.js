const express = require("express");
const categoryRouter = express.Router();
const CategoryController = require("../controllers/categoryController");

categoryRouter.get("/", CategoryController.getCategories);
categoryRouter.post("/", CategoryController.createCategory);

module.exports = categoryRouter;

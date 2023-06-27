const { Category } = require("../models");

class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json({ status: 200, data: categories });
    } catch (err) {
      next(err);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { name, color } = req.body;

      const newCategory = Category.create({ name, color });

      res.status(201).json({ status: 201, data: newCategory });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;

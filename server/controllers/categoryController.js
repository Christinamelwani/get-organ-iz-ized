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
}

module.exports = CategoryController;

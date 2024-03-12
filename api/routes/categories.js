const Category = require("../models/Category");
const express = require("express");
const router = express.Router();

router.get("/get-categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add-category", async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).json("Item added succesfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/update-category", async (req, res) => {
  try {
    await Category.findOneAndUpdate({ _id: req.body.categoryId }, req.body);
    res.status(200).json("Updated successfully !");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/delete-category", async (req, res) => {
  try {
    await Category.findOneAndDelete({ _id: req.body.categoryId });
    res.status(200).json("Deleted successfully !");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;

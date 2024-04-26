const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/CategoryModel');

router.get('/', async (req, res) => {
   let categoryList = await CategoryModel.find({});
   res.render('category/list', { categoryList });
})

router.get('/delete/:id', async (req, res) => {
   await CategoryModel.findByIdAndDelete(req.params.id);
   res.redirect('/category');
})

router.get('/add', async(req, res) => {
   try {
      let categories = await CategoryModel.find({}, 'name'); // Truy vấn danh sách các danh mục, chỉ lấy trường 'name'
      res.render('category/add', { categories }); // Truyền danh sách các danh mục vào view
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
})

 router.post('/add', async (req, res) => {
   try {
      const { name } = req.body; // Lấy tên category từ yêu cầu POST
      await CategoryModel.create({ name }); // Tạo một category mới với tên đã lấy
      console.log('Add new category succeed!');
      res.redirect("/"); // Chuyển hướng sau khi thêm category thành công
   } catch (error) {
      console.error('Error adding new category:', error);
      res.status(500).send("Internal Server Error");
   }
 });


router.get('/list', async (req, res) => {
   var categories = await CategoryModel.find({});
   res.render("category/list", { categories: categories });
})


module.exports = router;

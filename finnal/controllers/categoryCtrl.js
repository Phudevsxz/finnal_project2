const Category = require('../models/categoryModal')
const Products = require('../models/productModal')

const categoryCtrl = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createCategory: async (req, res) => {
        try {
            //set người dùng role == 1 => admin còn role bằng 0 thì là user
            // thêm quyền thêm xóa sửa thể loại cho admin
            const { name } = req.body;
            const category = await Category.findOne({ name })
            if (category) return res.status(400).json({ msg: "This category already exsit" })

            const newCategory = new Category({ name })

            await newCategory.save()
            res.json({ msg: "Created a category" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const products = await Products.findOne({ category: req.params.id })
            if (products) return res.status(500).json({ msg: "Please delete product with relatetionship" })
            //set người dùng role == 1 => admin còn role bằng 0 thì là user
            // thêm quyền thêm xóa sửa thể loại cho admin
            await Category.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted a category" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCategory: async (req, res) => {
        try {
            //set người dùng role == 1 => admin còn role bằng 0 thì là user
            // thêm quyền thêm xóa sửa thể loại cho admin
            const { name } = req.body;
            await Category.findOneAndUpdate({ _id: req.params.id }, { name })

            res.json({ msg: "Updated a category" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = categoryCtrl
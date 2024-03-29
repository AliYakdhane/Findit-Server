const category = require('../models/Category.Model')
const FormBuilder = require('../models/formBuilderModel')

exports.addCategory = async (req, res, next) => {
    try {
        const newCategory = new category({
            name: req.body.name,
            image: 'http://localhost:5000/image/' + req.file.filename,
            formId: req.body.formId
        })
        const response = await newCategory.save()

        res.status(201).send(response)
    } catch (err) {
        console.error(err)
        res.send(err)
    }
}
exports.deleteCategory = async (req, res, next) => {
    try {
        const _id = req.params._id
        const response = await category.findByIdAndDelete(_id)
        res.status(201).send(response)
        //TODO DELETE IMAGE
    } catch (err) {
        console.error(err)
        res.send(err)
    }
}
exports.updateCategoryName = async (req, res, next) => {
    try {
        const _id = req.params._id
        const categoryy = await category.findByIdAndUpdate(_id, {
            name: req.body.name
        })
        res.status(201).send({ message: 'updated' })
    } catch (err) {
        console.error(err)
        res.send(err)
    }
}
exports.updateCategoryImage = async (req, res, next) => {
    try {
        const _id = req.params._id
        const response = await category.findByIdAndUpdate(_id, {
            image: 'http://localhost:5000/image/' + req.file.filename
        })
        res.status(201).send({ message: 'updated' })
    } catch (err) {
        console.error(err)}
}
exports.getCategorys = async (req, res, next) => {
    try {
        const response = await category.find().populate('formId')
        res.status(201).send(response)
    } catch (err) {
        console.error(err)
        res.send(err)
    }
}
exports.getCategory = async (req, res, next) => {
    try {
        const _id = req.params._id
        const cat = await category.findById(_id).populate('formId')
        res.status(201).send(cat)
    } catch (err) {
        console.error(err)
        console.log(err)
        res.send(err)
    }
}
exports.getFormByCategory = async (req, res, next) => {
    try {
        const _id = req.params._id
        const cat = category.find({ formId: _id })
        res.send(cat)
    } catch (err) {
        console.error(err)
        res.send(err)
    }
}

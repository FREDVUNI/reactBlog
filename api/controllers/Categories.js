const Category = require("../models/Category")

//create the category
exports.createCategory = async (req,res) =>{
    const newCategory = new Category(req.body)
    try{
        const saveCategory = await newCategory.save()
        res.status(200).json(saveCategory)
    }
    catch(error){
        res.status(500).json(error || `There was a server error.`)
    }
}
//get single category
exports.getCategory = async (req,res) =>{
    try{
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    }
    catch(error){
        res.status(500).json(error || `There was a server error.`)
    } 
}
//get all categories
exports.getCategories = async (req,res) =>{
    try{
        const categories = await Category.find()
        res.status(200).json(categories)
    }
    catch(error){
        res.status(500).json(error || `There was a server error.`)
    } 
}
//update category
exports.updateCategory = async (req,res) =>{
    try{
        const category = await Category.findById(req.params.id)
        if(category.username === req.body.username){
            try{
            const updateCategory = await Category.findByIdAndUpdate(
                req.params.id,
                {$set:req.body},
                {new:true}
            )
            res.status(200).json(updateCategory)
            }
            catch(error){
                res.status(500).json(error || `There was a server error.`)
            }
    }else{
         res.status(409).json(error || `Something went wrong.`)
    }
    }
    catch(error){
        res.status(500).json(error || `There was a server error.`)
    } 
}
//delete category
exports.deleteCategory = async(req,res) =>{
    try{
        const category = await Category.findById(req.params.id)
        if(category.id === req.body.id){
           await Category.findByIdAndDelete(req.params.id)
           res.status(200).json(`The category has been deleted.`)
        }else{
            res.status(409).json(error || `Something went wrong.`)
        }
    }
    catch(error){
        res.status(500).json(error || `There was a server error.`)
    }
}
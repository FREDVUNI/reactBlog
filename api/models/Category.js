const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    category:{
        type:String,
        unique:true,
        required:true
    },
    photo:{
        type:String,
        default:""
    }
},{timestamps:true})
const Category = mongoose.model("category",CategorySchema)

module.exports = Category
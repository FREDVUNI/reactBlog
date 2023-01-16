const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    photo:{
        type:String,
        default:""
    },
    description:{
        required:true,
        type:String  
    },
    username:{
        required:true,
        type:String,
    },
    categories:{
        type:Array,
        required:false
    }
},{timestamps:true})
const Post = mongoose.model("post",PostSchema)
module.exports = Post
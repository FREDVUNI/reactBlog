const Post = require("../models/Post")

//create new post
exports.createPost = async (req,res) =>{
    const newPost = new Post(req.body);
    //or individual fields ({"title":req.body.title})
    try{
        const savePost = await newPost.save()
        res.status(200).json(savePost)
    }
    catch(error){
        res.status(500).json(error || `There was a server error`)
    }
}

//update post
exports.updatePost = async (req,res) =>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            try{
                const updatePost = await Post.findByIdAndUpdate(
                req.params.id,{$set:req.body},
                {new:true}
                )
                res.status(200).json(updatePost)
            }
            catch(error){
                res.status(500).json(error || `There was a server error`)
            }
        }else{
            res.status(401).json(`You can only update your posts.`)
        }
    }
    catch(error){
        res.status(404).json(error || `Post with id ${id} does not exist.`)
    }
}

//delete post
exports.deletePost = async (req,res) =>{
    const post = await Post.findById(req.params.id)
    try{
        if(post.username === req.body.username){
            try{
                await Post.findByIdAndDelete(req.params.id)
                res.status(200).json(`Post has been deleted.`)
                }
            catch(error){
                res.status(500).json(error || `There was a server error`)
            }
        }else{
            res.status(401).json(`You can only delete your posts.`)
        }   
    }
    catch(error){
        res.status(500).json(error || `There was a server error`)
    } 
}

//get single post
exports.getPost = async (req,res) =>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }
    catch(error){
        res.status(404).json(error || `Post with id ${id} does not exist.`)
    }
}

//get all posts & relate categories and author/user
exports.getPosts = async (req,res)=>{
    const username = req.query.user
    const category = req.query.cat
    try{
        let posts;
        if(username){
            posts = await Post.find({ username })
        }else if(category){
            posts = await Post.find({
                categories:{
                    $in:[category],
                }
            })
        }else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
    }
    catch(error){
        res.status(500).json(error || `There was a server error`)
    }

}
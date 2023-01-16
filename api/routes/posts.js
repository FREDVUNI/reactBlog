const express = require("express")
const router = express.Router()
const PostController = require("../controllers/Posts")

router.post("/",PostController.createPost)
router.get("/",PostController.getPosts) 
router.get("/:id",PostController.getPost)
router.put("/:id",PostController.updatePost)
router.delete("/:id",PostController.deletePost)

module.exports = router
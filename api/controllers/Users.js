const User = require("../models/User.js")
const bcrypt = require("bcrypt")

//update user
exports.updateUser = async (req,res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }
        try{
            const UpdateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set:req.body,
                },
                { new:true }
            );
            res.status(200).json(UpdateUser)
        }
        catch(error){
            res.status(500).json(error || `There was a server error`)
        }
    }else{
        res.status(401).json(`You can only update your account.`)
    }
}

//delete user
exports.deleteUser = async (req,res) =>{
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id)
            try{
                await Post.deleteMany({username:user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json(`user has been deleted.`)
            }
            catch(error){
                res.status(500).json(error || `There was a server error.`)
            }
        }
        catch(error){
            res.status(404).json(error || `user with id ${id} was not found.`)
        }
    }else{
        res.status(401).json(`You can only delete your account.`)
    }
}
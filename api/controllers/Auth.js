const User = require("../models/User")
const bcrypt = require("bcrypt")

exports.register = async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        const NewUser = await new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })
        const user = await NewUser.save()
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json(error || `There was a server error`)
    }
}
exports.login = async (req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username}) 
        !user && res.status(400).json(`wrong password username combination`)
        const pass = await bcrypt.compare(req.body.password,user.password)
        !pass && res.status(400).json(`wrong password username combination`)
        const {password,...stuff} = user._doc;
        res.status(200).json(stuff)
    }
    catch(error){
        res.status(500).json(error || `There was a server error.`)
    }
}
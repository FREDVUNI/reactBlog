const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const path = require("path")
const app = express()
const multer = require("multer")
const connectDB = require("./database/connection")

dotenv.config({path:"config.env"})
app.use(morgan("tiny"))
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))

app.use("/api/auth",require("./routes/auth")) 
app.use("/api/users",require("./routes/users"))
app.use("/api/posts",require("./routes/posts"))
app.use("/api/categories",require("./routes/categories"))

//upload images
const storage = multer.diskStorage({ 
   destination:(req,file,cb)=>{
       cb(null,"images/uploads");
   },
   filename:(req,file,cb)=>{
       cb(null,req.body.name);
   } 
})
const upload = multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json(`File has been uploaded.`)
}) 

connectDB()
app.listen(PORT,()=>{
    console.log(`server started on http://localhost:${PORT}`)
})

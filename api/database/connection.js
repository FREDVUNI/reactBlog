const mongoose = require("mongoose")

const connectDB = async ()=>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URI,{
            UseUnifiedTopology:true,
            // UseCreateIndex:true,
            // UseFindAndModify:false,
            UseNewUrlParser:true
        })
        console.log(`server connected to database http://${con.connection.host}:${con.connection.port}`)
    }
    catch(error){
        console.log (error)
        process.exit(1)
    }
}
module.exports = connectDB
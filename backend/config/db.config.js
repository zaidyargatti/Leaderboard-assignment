import mongoose from "mongoose";
// import dotenv from "dotenv"

// dotenv.config()

const dbconnect = async(req,res)=>{
    try {
       await  mongoose.connect(`${process.env.DB_URL}`)
       console.log('MongoDB Connected Sucessfully');
       
    } catch (error) {
        res.json({
            msg:'Connection Failed',
        })
        process.exit(1)
        console.log(error)
    }
}

export default dbconnect
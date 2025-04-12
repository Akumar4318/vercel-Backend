
const mongoose=require('mongoose')

function connectDb(){

    return mongoose.connect(process.env.DATABASE_URL)
}

module.exports=connectDb
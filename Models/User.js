const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({

    firstName:{
        type:String,
        require:true,
        trim:true,
    },
    lastName:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Student","Instructor","Admin"],
        required:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,

    }],
    image:{
        type:String,
        required:true,
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"courseProgress"
        }
    ],
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date
        },
        

}, { timestamps: true })

module.exports=mongoose.model("User",userSchema)
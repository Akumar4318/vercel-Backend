const mongoose=require('mongoose')


const courseSchema=new mongoose.Schema({

   courseName:{
    type:String,
    trim:true,
    required:true,
   },
   courseDescription:{
    type:String,
    trim:true,
    required:true,
   },
   instructor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
   },
   whatYouWillLearn:{
    type:String,
    trim:true,
    required:true,
   },
   courseContent:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Section",

   }],
   ratingAndReview:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"ratingAndReview",
    required:true,
   }],
   price:{
    type:Number,
    trim:true,
    required:true,
   },
   thumbnail:{
    type:String,
    trim:true,
    
   },
   category:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"category"
   }, 
   tag:{
    type:[String],
    required:true,
   },
   studentEnrolled:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
   }],
   instructions:{
      type:[String]
   },
   status:{
      type:String,
      enum:["Draft","Published"],
   },
   createdAt:{
      type:Date,
      default:Date.now()
   }

})

module.exports= mongoose.model("Course",courseSchema)
const RatingAndReview=require('../Models/RatingAndReview')
const Course=require('../Models/Course')
const mongoose=require('mongoose')

// create Rating

exports.createRating=async(req,res)=>{

    try {
        
        //? get userId
        const userId=req.user.id;
        //? fetch from reqbody
        const {rating,review,courseId}=req.body;
        //? cehck user enrolled or not 


       
        const courseDetails=await Course.findOne(
                                    {_id:courseId,
                                        studentEnrolled:{$elemMatch:{$eq:userId}}
                                    }
        )

        console.log(courseDetails)
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student not erolled in the course"
            })
        }
        //? check if user already review or not

        const alreadyReviewd=await RatingAndReview.findOne({
                                    user:userId,
                                    Course:courseId,
        })
        if(alreadyReviewd){
            return res.status(403).json({

                    success:false,
                    message:"Course is already reviewed by the User"
            })
        }
        //? create review

        const ratingReview=await RatingAndReview.create({
            rating,review,Course:courseId,
            user:userId,
        })
        //? attach the review in the course and update the course with this rating/reviews

        const updatedCourseDetails=    await Course.findByIdAndUpdate({_id:courseId},
                {
                    $push:{
                        RatingAndReview:ratingReview._id,
                    }
                },{new:true}
            )
            console.log(updatedCourseDetails)
        //? return response

        return res.status(200).json({
            success:true,
            message:'Rating and review created successfully',
            ratingReview
        })

    } catch (error) {
        
        return res.status(500).json({
            success:false,
            message:error.message
        })

    }
}

// get AvgRating

exports.getAvgRating=async()=>{

    try {
        //? get courseId
        const courseId=req.body.courseId;

        //? calculate avg rating

        //NOTE -  aggreate return a array

        const result=await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])

      
        //? return rating
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }

        //? if not ratin /review exist 
        
        return res.status(200).json({
            success:true,
            message:"average Rating is o no rating given till now",
            averageRating:0,
        })
        
    } catch (error) {
        
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// Get all rating and review

exports.getAllrating=async(req,res)=>{
    try {
        
        const allReviews=await RatingAndReview.find({})
                                    .sort({rating:'desc'})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email"
                                    })
                                    .populate({
                                        path:"Course",
                                        select:"courseName"
                                    }).exec();
                                    
              return res.status(200).json({
                success:true,
                message:"All reviews fethched successfully",
                allReviews
              })                      

    } catch (error) {
        
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const {instance}=require('../Config/razorpay')
const Course=require('../Models/Course')
const User=require('../Models/User')
const mailSender=require('../utils/mailSender')
const {courseEnrollmentEmail}=require('../mail/templates/courseEnrololmentEmail')
const { Types, mongo, default: mongoose } = require('mongoose')
const Razorpay = require('razorpay')
const { paymentSuccessEmail } = require('../mail/templates/paymentsuccessEmail')
const crypto = require("crypto")
const CourseProgress =require('../Models/CourseProgress')
// intiate the razorpay order

exports.capturePayment=async(req,res)=>{

    const {courses}=req.body;
    const userId=req.user.id;


    if(courses.length ===0 ){
        return res.json({success:false,message:"Please provide course id"})
    }

    let totalAmount =0;

    for(const course_id of  courses){
        let course;
        try {
            course=await Course.findById(course_id);
            if(!course){
                return res.status(200).json({success:false,message:"Could not find the course"})

            }

            const uid=new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)){
                return res.status(200).json({success:false,message:"Student is already Enrolled"});
            }
            totalAmount+=course.price;
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }


    const options={
        amount:totalAmount*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString(),
    }

    try {
        const paymentResponse=await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Could not intitate Order"
        })
    }

}


// payment verification controller

// here we see if the signature comes from Razorpay is same as you send from the user the only payment should be successfull and you will assign course the student

exports.verifyPayment=async(req,res)=>{

    const razorpay_order_id=req.body?.razorpay_order_id;
    const razorpay_payment_id=req.body?.razorpay_payment_id;
    const razorpay_signature=req.body?.razorpay_signature;
    const courses=req.body?.courses;
    const  userId=req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId){
        return res.status(200).json({
            success:false,
            message:"Payment failed"
        })
    }
    



    let body=razorpay_order_id+"|"+razorpay_payment_id;

    const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
    .update(body.toString()).digest('hex');


    if(expectedSignature === razorpay_signature){

        // enrolled that student
       let response= await enrollStudents(courses, userId, res)
        return res.status(200).json({
            success:true,
            message:'Payment Verified',
            data:response
        });
    }
    return res.status(400).json({success:false,messaage:"payment Failed"})


}





const enrollStudents =async(courses,userId,res)=>{

 

    try {
     if(!courses || !userId){
         return res.status(400).json({
             success:false,
             message:'Please Provide data for Course Id or userId'
         })
     }
 
     for(const courseId of courses){
        
 
         const enrolledCourse=await Course.findOneAndUpdate(
             {_id:courseId},
             {
                 $push:{studentEnrolled:userId},
                
             },
             {new:true}
         )
 

         if(!enrolledCourse){
             return res.status(500).json({
                 success:false,
                 error:'Course not found'
             })
         }
         
         const courseProgress = await CourseProgress.create({
            courseId: courseId,
            userId: userId,
            completedVideos: [],
          })
 
         // find the student and add the course to their list of enrolledCourses
 
         const enrolledStudent=await User.findByIdAndUpdate(userId,
             {
                $push: {
                    courses: courseId,
                    courseProgress: courseProgress._id,
                  },
             },
             {new:true}
         )
 
      
 
       
         // send a mail to the student who purchesed the product
 
         const emailResponse =await mailSender(
             enrolledStudent.email,
             `successfully Enrolled into ${enrolledCourse.courseName}`,
             courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledStudent.firstName}`)
         )
        
      
     }
    } catch (error) {
     
     console.log(error)
     return res.status(500).json({success:false,message:"Payment failder"})
    }
 }
 




// enrolled the student
 
// sare course pe travel karo or enrolled courses ke andar user id insert kar do bache ki

// jo use hai jisene course buy kiye hai o sare ke sare course id us bache ki course ki list mai add kardo




exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body
  
    const userId = req.user.id
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
      const enrolledStudent = await User.findById(userId)
  
      await mailSender(
        enrolledStudent.email,
        `Payment Received`,
        paymentSuccessEmail(
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
          amount / 100,
          orderId,
          paymentId
        )
      )
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
  }
  























// capture the payment and intiate the razorpay order

// exports.capturePayment=async(req,res)=>{

//     //? get courseId and userId

//     const {course_Id}=req.body ;
//     const{userId}=req.user.id;
//     //? valid course id and userid
//     if(!course_Id) {

//         return res.status(400).json({
//             success:false,
//             message:"please provide valid course ID"
//         })
//     }

   
//     //? valid courseDetails
//     let course;
//     try {
//         course=await Course.findById(course_Id);
//         if(!course_Id){
//              res.status(400).json({
//                 success:false,
//                 message:"Course not found"
//             })
//         }

//          //? user alresay pay for the same course 

//          const uid=new mongoose.Types.ObjectId(userId);
//          if(course.studentsEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success:false,
//                 message:"Student is already enrolled"
//             });
//          }
//     } catch (error) {
        
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message
//         })
//     }
//    //? order create
//    const amount=course.price;
//    const currency="INR";
//    const options={
//     amount:amount*100,
//     currency,
//     receipt:Math.random(Date.now()).toString(),
//     notes:{
//         courseId:course_Id,
//         userId
//     }
//    }

//    try {
    
//     // intiate the payment using razorpay
//     const paymentResponse=await instance.orders.create(options);
//     console.log(paymentResponse)

//     return res.status(200).json({
//         success:true,
//         CourseName:course.courseName,
//         courseDescription:course.courseDescription,
//         thumbnail:course.thumbnail,
//         currency:paymentResponse.currency,
//         orderid:paymentResponse.orderid,
//         amount:paymentResponse.amount
//     })

//    } catch (error) {
    
//     console.log(error)
//     res.json({
//         success:false,
//         message:"could not intitate order"
//     })
//    }
   
// }


// // verify signature of razorpay

// exports.verifySignature=async(req,res)=>{

//     const webhookSecret="1234567";

//     const signature=req.headers["x-razorpay-signature"];


//     const shasum=crypto.createHmac("sha256",webhookSecret);
//     shasum.update(JSON.stringify(req.body))
//     const digest=shasum.digest("hex");

//     //match the signature and digest

//     if(signature===digest){
         
//         console.log("Payment is Authorised")

//         const {courseId,userId}=req.body.payload.payment.entity.notes;

//         try {
            
//             //? fullfill the action find the course and erolled in the course

//             const enrolledCourse=await Course.findOneAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true})

//             if(!enrolledCourse){
//                 return res.status(400).json({
//                     success:false,
//                     message:"course not found"
//                 })
//             }

//             console.log(enrolledCourse)

//             //? find the student and enrolled the student  in the course
            
//             const enrolledStudent=await User.findOneAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true});
//             console.log(enrolledStudent)


//             /// mail send confirmation mail
            
//             const emailResponse=await mailSender(

//                                         enrolledStudent.email,
//                                         "congratulaion,from Studenthive",
//                                         "congratulaion, you are onboarde into new Course",

//             );

//             console.log(emailResponse)
//             return res.status(200).json({
//                 success:ture,
//                 message:"Signature verified and course added"
//             })
//         } catch (error) {
//             console.log(error)
//             return res.status(400).json({
//                 success:false,
//                 message:error.message
//             })
//         }
//     }

//     else{
//         return res.status(400).json({
//             success:false,
//             message:"Invalid request"
//         })    }

// }
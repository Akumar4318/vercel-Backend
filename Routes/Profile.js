const express = require("express")
const router = express.Router()
const{auth,isInstructor}=require('../Middleware/auth')



const{updateProfile,deleteAccount,getUserDetails,updateDisplayPicture,
    getEnrolledCourses,
    instructorDashboard,}=require('../Controllers/Profile')
 
const {isDemo}=require('../Middleware/demo')    

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// delete User Account
router.delete("/deleteProfile", auth, deleteAccount)

//updateProfile
router.put("/updateProfile", auth, updateProfile)

// getUserDetails

router.get('/getuserdetails',auth,getUserDetails)

// Get Enrolled Courses

router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)



module.exports=router
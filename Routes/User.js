const express=require('express')
const router=express.Router();


// import the required controller and middleware functions

const {login,singUp,sendotp,changePassword}=require('../Controllers/Auth')
const {resetPasswordToken,resetPassword}=require('../Controllers/ResetPassword')
const {auth}=require('../Middleware/auth')


// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

//Route for user login
router.post("/login",login)
//Route for user singup
router.post('/signup',singUp)

//Route for sending OTP to the user's email
router.post('/sendotp',sendotp)

// Route for changing the password
router.post('/changepassword',auth,changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

//Route for generating a rest password token
router.post('/resetpasswordtoken',resetPasswordToken)

//Route for resetting user's password after verification 
router.post('/resetpassword',resetPassword)

// export the router For use in the main application

module.exports=router
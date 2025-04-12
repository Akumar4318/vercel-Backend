// Import the required modules
const express = require("express")

const router = express.Router()

const{auth,isInsturnctor,isStudent,isAdmin}=require("../Middleware/auth")

const{capturePayment,verifyPayment,sendPaymentSuccessEmail}=require('../Controllers/payment')

router.post('/capturepayment',auth,isStudent,capturePayment)
// router.post('/verifypayment',auth,isStudent,verifySignature)
router.post('/verifyPayment',auth,isStudent,verifyPayment)
router.post('/sendPaymentSuccessEmail',auth,isStudent,sendPaymentSuccessEmail)

module.exports=router
const User=require('../Models/User')
const mailSender=require('../utils/mailSender')
const bcrypt=require('bcrypt')
const crypto=require('crypto')



// resetPassword token

exports.resetPasswordToken=async(req,res)=>{

  try {
    
      //? get email from req,body

      const email=req.body.email

      //? check user for this email , email validation
  
      const user=await User.findOne({email})
  
      if(!user){
          return res.status(400).json({
              success:false,
              message:`This Email: ${email} is not Registered With Us Enter a Valid Email `,
          })
      }
      //? token generate and add expire time 
  
      const token=crypto.randomUUID();
  
      //? update user by adding token and expiration time 
  
      const updatedDetails=await User.findOneAndUpdate({email:email},{
          token:token,
          resetPasswordExpire:Date.now()+5*60*1000
      },{new:true})
      //? create url 
  
      const url = `http://localhost:3000/update-password/${token}`;
      //? send mail containing the url 

      console.log("updateDetials",updatedDetails)
  
      await mailSender(email,"Password Reset Link",
          `Your Link for email verification is ${url}. Please click this url to reset your password.`
      )
      // ? return response

      return res.status(200).json({
        success:true,
        message:"email sent successfully please check email and change password"
      })
  } catch (error) {
    
    console.log(error)

    return res.status(500).json({
        success:false,
        message:"Somthing went wrong while reseting the password",
        message:error.message,
    })
  }

}


// resetPassword

exports.resetPassword=async(req,res)=>{
	try {
		const { password, confirmPassword, token } = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
}
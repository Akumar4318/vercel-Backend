const { populate } = require("../Models/Course");
const Profile = require("../Models/Profile");
const User = require("../Models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../Models/CourseProgress");
const Course = require("../Models/Course");



exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body
    const id = req.user.id

    // Find the profile by id
    const userDetails = await User.findById(id)
    const profile = await Profile.findById(userDetails.additionalDetails)

    const user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
    })
    await user.save()

    // Update the profile fields
    profile.dateOfBirth = dateOfBirth
    profile.about = about
    profile.contactNumber = contactNumber
    profile.gender = gender

    // Save the updated profile
    await profile.save()

    // Find the updated user details
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec()

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
};

//REVIEW -  delete account

exports.deleteAccount = async (req, res) => {
  try {
    //? get id

    const id = req.user.id;

    //? find id

    const userDetails = await User.findById(id);
    //? validation
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "No such user Exist",
      });
    }

    //? delete the profile
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
    //TODO -  delete from enrolled countb or unrolled user from all enrolled course

    //? user delete
    await User.findByIdAndDelete({ _id: id });

    //? return res
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user can not be deleted",
    });
  }
};

///REVIEW -  how can we scheldule the delete account

// to get all the details of user

exports.getUserDetails = async (req, res) => {
  try {
    //? get Id

    const id = req.user.id;
    //? validation and get user Details
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    //? return response
 

    return res.status(200).json({
      success: true,
      message: "user data fetch successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// updateDisplayPicture

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

// get Enrollement courses

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
    userDetails = userDetails.toObject()
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      })
      courseProgressCount = courseProgressCount?.completedVideos.length
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier

          
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


exports.instructorDashboard=async(req,res)=>{

  try {
    
    const courseDetails=await Course.find({instructor:req.user.id});

    const CourseData=courseDetails.map((course)=>{
      const totalStudentEnrolled=course.studentEnrolled.length
      const totalAmountGenereted=totalStudentEnrolled *course.price;


      // create an new object with the additional fields

      const courseDataWithStats={
        _id:course._id,
        courseName:course.courseName,
        courseDescription:course.courseDescription,
        totalStudentEnrolled,
        totalAmountGenereted,
      }

      return courseDataWithStats;
    })


    res.status(200).json({
      course:CourseData
    })

  } catch (error) {
    console.error(erro);
    res.status(500).json({
      message:"Interna server error"
    })
  }
}
// Import the required modules
const express = require("express");
const router = express.Router();

// Course Controllers Import
const {
  createCourse,
  showAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../Controllers/Course");

// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../Controllers/Category");

// sections controllers
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../Controllers/Section");

//Sub-section controllers

const {
  createsubSection,
  updateSubSection,
  deleteSubSection,
} = require("../Controllers/SubSection");

// Rating controllers
const {
  createRating,
  getAvgRating,
  getAllrating,
} = require("../Controllers/RatingAndReview");

// CourseProgress Controllers
const { updateCourseProgress } = require("../Controllers/CourseProgress");

// Importing Middlewares

const {
  auth,
  isStudent,
  isInstructor,
  isAdmin,
} = require("../Middleware/auth");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// course only be created by instructor

router.post("/createcourse", auth, isInstructor, createCourse);

// Add a section to a course
router.post("/addsection", auth, isInstructor, createSection);

// update a section
router.post("/updatesection", auth, isInstructor, updateSection);

//DeleteSection
router.post("/deletesection", auth, isInstructor, deleteSection);

//Add a subsection
router.post("/addsubsection", auth, isInstructor, createsubSection);

//NOTE - delete a sub-section
router.delete("/deletesubsection", auth, isInstructor, deleteSubSection);

//NOTE - update a sub-section
router.post("/updatesubsection", auth, isInstructor, updateSubSection);

// get all registered Course
router.get("/getallcourses", showAllCourses);

// get details for a specific courses
router.post("/getcoursedetails", getCourseDetails);

router.post("/editCourse", auth, isInstructor, editCourse);
// Get all Courses Under a Specific Instructor

// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails);

//edit course
//NOTE - get all courses under a specific instuructor

router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

//NOTE - delete course

router.delete("/deletecourse", deleteCourse);

//NOTE - update course Progress

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

router.post("/createcategory", auth, isAdmin, createCategory);
router.get("/showallcategories", showAllCategories);
router.post("/getCategorypagedetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

router.post("/creatingrating", auth, isStudent, createRating);
router.get("/getaveragerating", getAvgRating);
router.get("/getreviews", getAllrating);

module.exports = router;

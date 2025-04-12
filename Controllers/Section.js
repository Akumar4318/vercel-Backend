const Section=require('../Models/Section')
const Course=require('../Models/Course');
const SubSection = require('../Models/SubSection');




exports.createSection=async(req,res)=>{

    try {
        
        // data fetch

        const {sectionName,courseId}=req.body ;
      
         //? data validation

         if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
         }

         //? create sections
         const newSection=await Section.create({sectionName})

         //? update course with section objectId

         const updateCourseDetails=await Course.findByIdAndUpdate(
                                            courseId,{
                                                $push:{
                                                    courseContent:newSection._id,
                                                },
                                            },
                                            {new:true}
         )
         .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec(); 
         // how to use populate section and subsection


         return res.status(200).json({
            success:true,
            message:"Section created Successfully",
            data:updateCourseDetails
         })

    } catch (error) {
        
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Unable create Section please try again",
            error:error.message
        })
    }
}

/// update a section

exports.updateSection=async(req,res)=>{
    try {
        
        //?  data input
        const {sectionName,sectionId,courseId}=req.body 
console.log(sectionName,sectionId,courseId)
      
        //? data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
         }
          //? update data
          const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true})
            //? return res
            const course=await Course.findById(courseId).populate({
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }).exec()
              
            return res.status(200).json({
                success:true,
                message:"section updated successfully",
                data:course
            })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable update Section please try again",
            error:error.message
        })
    }
}

// delete sections

exports.deleteSection=async(req,res)=>{

    try {
        
        //? get id -- assuming that we are sending ID in body

        const {sectionId,courseId}=req.body
        console.log("aman",sectionId,courseId)
        await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
        await SubSection.deleteMany({_id: {$in: section.subSection}});


        await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();
       
        res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
         
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable delete Section please try again",
            error:error.message
        })
    }
}
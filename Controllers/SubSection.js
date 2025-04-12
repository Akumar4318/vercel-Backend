const Section = require("../Models/Section");
const SubSection = require("../Models/SubSection");

const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

// create subsection

exports.createsubSection = async (req, res) => {
  try {
    //? fetch data from req.body
    const { title, description, sectionId } = req.body;
    console.log(title,sectionId,description)
    //? extract file/video
    const video = req.files.video;
    //? validation
    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are requireds",

      });
    }
    //? upload video to cloudinary ---> secure url
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    // SubSection.videoUrl=uploadDetails.secure_url
    // SubSection.timeDuration=`${uploadDetails.duration}`
    //? create a subsection
    const subSectionDetails = await SubSection.create({
      title: title,
      description: description,
      timeDuration: `${uploadDetails.duration}`,
      videoUrl: uploadDetails.secure_url,
    });
    //? push the sub-section id into section
    //? update section with thise sub section objectId
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: subSectionDetails._id } },
      { new: true }
    ).populate("subSection")
    //TODO -  log update section here after adding populate qurey

    //? return .json

    return res.status(200).json({
      success: true,
      message: "subsection created successfully",
      data:updatedSection
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//LINK -  - -  update subsection

exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body;
    
    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }

    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    await subSection.save();
    // find updated section and return it

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    console.log("updated section ", updatedSection);

    return res.status(200).json({
      success: true,
      message: "section updated successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    });
  }
};

//ANCHOR - - delete subsection

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );
    const subSection = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" });
    }

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    ).populate('subSection')

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error(error);
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",error,
      
    });
  }
};

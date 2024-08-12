import mongoose from "mongoose";

const { Schema } = mongoose;

const coursesSchema = new Schema({
    coursename: {
        type: String,
        required: true
    },
    Courseimage: {
        type: String,
        required: true
    },
    coursevideos: {
        type: [String],
        required: true
    },
    coursedescription: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    }
})

const courseModule = mongoose.model("courses", coursesSchema);

export default courseModule;
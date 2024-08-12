import db from "../modules/index.js";

const { course: Course } = db;


const saveCourse = async (payload) => {
    try {
        const courseResponse = Course({ ...payload })
        const response = courseResponse.save()
        return response
    } catch (error) {
        throw error
    }
}


const searchCourse=async(coursename)=>{
    try {
     const response = await Course.find({coursename}).exec();
     console.log(response)
     return response   
    } catch (error) {
        throw error
    }
}


export {
    saveCourse,
    searchCourse
}

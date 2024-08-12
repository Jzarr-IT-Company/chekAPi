import { saveCourse, searchCourse } from "../services/courses.services.js"

const addCourses = async (req, res) => {
    try {
        const { coursename, Courseimage, coursevideo, coursedescription, duration } = req.body;
        const obj = {
            coursename, Courseimage, coursevideo, coursedescription, duration
        }
        const reponse = await saveCourse(obj)

        return res.status(200).json({ status: 200, message: "success", reponse })
    } catch (error) {
        return res.status(500).json({ status: 500, message: "internal error" })
    }
}

const getCourses = async (req, res) => {
    try {
        const coursename = req.query.coursename || '';
        if (!coursename) {
            return res.status(400).json({
                status: 400,
                message: "Bad Request",
                errorMessage: "This coursename are not available this time!"
            });
        }
        const response = await searchCourse(coursename)
        return res.status(200).json({ status: 200, message: "success", response })
    } catch (error) {
        return res.status(500).json({ status: 500, message: "internal error" })
    }
}

export {
    addCourses,
    getCourses
}
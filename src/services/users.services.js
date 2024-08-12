import db from "../modules/index.js"
const { users: Users, token: Token } = db


const usersSave = async (payload) => {
    try {
        const userDataSave = await Users({ ...payload })
        const response = await userDataSave.save()
        return response
    } catch (error) {
        throw error
    }
}

const findByEmail = async (email) => {
    try {
        const response = await Users.findOne({ email });
        return response
    } catch (error) {

    }
}

const tokenSave = async (payload) => {
    try {
        const token = await Token({ ...payload });
        const response = token.save();
        return response
    } catch (error) {
        throw error
    }
}

const logoutUser = async (uid) => {
    try {
        const response = await Token.deleteMany({ user: uid })
        return response
    } catch (error) {
        throw error
    }
}

const updatedUser = async (id, payload) => {
    try {
        const {
            phone,
            city,
            coursename,
            futurePlan,
            DOB,
            country,
            graduation,
            specialization,
            gender,
            currentStatus,
            profileImage,
            IsComputer
        } = payload;
        console.log("coursename", coursename)
        const response = await Users.updateOne(
            { _id: id }, // Filter criteria to find the document
            {
                $set: { // Use $set to specify which fields to update
                    phone: phone,
                    city: city,
                    courses: coursename,
                    futurePlan: futurePlan,
                    DOB: DOB,
                    country: country,
                    graduation: graduation,
                    specialization: specialization,
                    gender: gender,
                    currentStatus: currentStatus,
                    profileImage: profileImage,
                    IsComputer: IsComputer
                }
            }
        );
        return response
    } catch (error) {
        console.log("UPDATE ERROR", error.message)
        throw error
    }
}
const updatedCourse = async (id, payload) => {
    try {
        console.log("coursename", payload)
        const response = await Users.updateOne(
            { _id: id }, // Filter criteria to find the document
            {
                courses:payload
                
            }
        );
        return response
    } catch (error) {
        console.log("UPDATE ERROR", error.message)
        throw error
    }
}


export {
    usersSave,
    findByEmail,
    tokenSave,
    logoutUser,
    updatedUser,
    updatedCourse
}
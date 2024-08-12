import jwt from "jsonwebtoken";
// const Stripe = require('stripe');
import { findByEmail, logoutUser, tokenSave, updatedCourse, updatedUser, usersSave } from "../services/users.services.js";
import { compareHash, hashPassword } from "../utils/hash.util.js";
import serverConfig from "../config/server.config.js";



const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await findByEmail(email)
        if (existingUser) {
            return res.status(400).json({ status: 400, success: false, message: "User already exists with this email" });
        }
        const hashedPassword = await hashPassword(password);

        const signupData = {
            name, email, password: hashedPassword
        }
        const response = await usersSave(signupData);
        console.log("response", response);
        return res.status(200).json({
            status: 200,
            success: true,
            message: "User registered successfully",
            response
        });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Internal server error", errormessage: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await findByEmail(email)
        if (!existingUser) {
            return res.status(400).json({ status: 400, success: false, message: "Incorrect Credientail" });
        }
        const comparePassord = await compareHash(password, existingUser.password)
        if (!comparePassord) {
            return res.status(400).json({ status: 400, success: false, message: "Incorrect Credientail" });
        }
        const token = jwt.sign({ email: existingUser.email, username: existingUser.name }, serverConfig.secretKey)
        const response = await tokenSave({ token, user: existingUser.id })
        return res.status(200).json({ status: 200, message: "success", token: response.token })
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Internal server error", errormessage: error.message });
    }
}

const logout = async (req, res) => {
    try {
        const { id } = req.body;
        const response = await logoutUser(id)
        return res.status(200).json({ status: 200, message: "logout success" })
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Internal server error", errormessage: error.message });
    }
}

const updateUserAccount = async (req, res) => {
    try {
        const { id, data } = req.body;
        const resposne = await updatedUser(id, data)
        return res.status(200).json({ status: 200, message: "update success" })
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Internal server error", errormessage: error.message });
    }
}

const courseUpdate = async (req, res) => {
    try {
        const { id, courses } = req.body;
        const response = await updatedCourse(id, courses)
        console.log("response", id, courses)
        console.log("response", response)
        return res.status(200).json({ status: 200, message: "update success" })
    } catch (error) {
        console.log("CONTROLLERS ERROR", error.message)

        return res.status(500).json({ status: 500, message: "Internal server error", errormessage: error.message });
    }
}

export {
    signup,
    login,
    logout,
    updateUserAccount,
    courseUpdate
}
import mongoose from "mongoose";

const { Schema } = mongoose;

const usersSchems = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        default: null
    },
    DOB: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    graduation: {
        type: String,
        default: null
    },
    specialization: {
        type: String,
        default: null
    },
    currentStatus: {
        type: String,
        default: null
    },
    futurePlan: {
        type: String,
        default: null
    },
    courses: {
        type: [String],
        default: null
    },
    profileImage: {
        type: String,
        default: null
    },
    IsComputer: {
        type: String,
        default: null
    },
    class: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const usersModule = mongoose.model("students", usersSchems)


export default usersModule



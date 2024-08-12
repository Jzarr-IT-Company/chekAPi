import express from "express";
import { courseUpdate, login, logout, signup, updateUserAccount } from "../controllers/signup.controlller.js";
import { addCourses, getCourses } from "../controllers/courses.controllers.js";
import payment from "../controllers/payment.controllers.js";

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/addcourse', addCourses)
router.post('/searchCourses', getCourses)
router.post('/update',updateUserAccount)

router.post('/payment',payment)
router.post('/courseUpdate',courseUpdate)
// getCourses


export default router
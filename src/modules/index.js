import mongoose from "mongoose";
import usersModule from "./users.module.js";
import tokenModule from "./token.module.js";
import paymentModule from "./payment.module.js";
import courseModule from "./courses.module.js";

const db = {}

db.mongoose = mongoose,
db.users = usersModule,
db.token = tokenModule,
db.payment= paymentModule,
db.course= courseModule


export default db

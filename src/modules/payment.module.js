import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const paymentModule = mongoose.model("payment", paymentSchema);

export default paymentModule;
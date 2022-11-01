import mongoose, { model } from "mongoose";

const providerSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, index: true }
}, { timestamps: true })

export default mongoose.model('Provider', providerSchema)
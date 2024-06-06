import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 64,
        },
        address: {
            type: String,
            trim: true,
        },
        phoneNumber: {
            type: String,
            require: false
        },
        role: {
            type: Number,
            default: 0,
        }
    },
    { timestamp: true }
);

export default mongoose.model("User", userSchema);
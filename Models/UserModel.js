import mongoose from "mongoose";
let UserSchema = mongoose.Schema({
    UID: {
        type: String,
        unique: true,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Mobile: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Country: {
        type: String,
    },
    City: {
        type: String,
    },
    ProfilePic: {
        type: String,
    },
    Gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
    },
    Role: {
        type: [String],
        enum: ['Customer', 'Influencer', 'Admin'],
        default: ['Customer'],
    },
    LoginCount: {
        type: Number,
        default: 0
    },
    DOB: {
        type: Date,
    },
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdateAt' } })

UserSchema = mongoose.models.Users || mongoose.model("Users", UserSchema, "Users");

export default UserSchema;
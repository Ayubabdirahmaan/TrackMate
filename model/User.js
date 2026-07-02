import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profile: String
})




const User = mongoose.model('User', userSchema)

export default User
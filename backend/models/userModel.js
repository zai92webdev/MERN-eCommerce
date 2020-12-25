const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
    avatar: {
        type: String,
        default:"https://res.cloudinary.com/djt9vokjn/image/upload/v1606792571/Default%20Icon%20Image/avatar_hpld2i.png"
    },
    username: { 
        type: String,
        required: true,
        trim: true},
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,},
    password: {
        type: String,
        required: true,},
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
    },
    {
    timestamps: true,
    }
)


module.exports = mongoose.model('Users',userSchema)
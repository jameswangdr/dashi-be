const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profile_photo: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    join_date: {
        type: Date,
        default: Date.now,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("User", UserSchema);
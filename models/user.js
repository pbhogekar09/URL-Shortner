const e = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true,
        },
        email : {
            type: String,
            required: true,
            unique: true,
        },
        role : {
            type: String,
            required: true,
            default: "NORMAL",
        },
        password : {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }

);

const User = mongoose.model("user", userSchema); // model
module.exports = User;
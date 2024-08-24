import mongoose from "mongoose";

const userSchemar = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //  match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    
    },
    password: {
        type: String,
        required: true,
        // validate: {
        //     validator: (value) => value > 6,
        //     message: "value must be greater than 6"
        // },
    }
});

const User = mongoose.models.User || mongoose.model("User", userSchemar);
export default User;

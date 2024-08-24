import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

const Upload = mongoose.models.Upload || mongoose.model("Upload", uploadSchema);
export default Upload;

import mongoose from 'mongoose';


const ImageSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true
    }
})

export const Image = mongoose.models.Images_ || mongoose.model('Images_', ImageSchema)
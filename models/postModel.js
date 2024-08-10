import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
    mag: {
        type: String,
        require: true
    }
}, {timestamps: true})

const PostModel = models.post || model('post', postSchema)

export default PostModel;
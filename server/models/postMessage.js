import mongoose from 'mongoose';

const postSchema =  mongoose.Schema({
    title: String,
    ingredients: String,
    caloriesPerServing: Number,
    proteinPerServing: Number,
    instructions: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    }

});

const PostMessage = mongoose.model('PostMesage', postSchema);

export default PostMessage;
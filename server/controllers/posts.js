import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage( {...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save()
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body; //send from front end

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id'); 
    //check if _id is a valid mongoose id

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post , { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body; 

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id'); 
    //check if _id is a valid mongoose id

    await PostMessage.findByIdAndRemove(id);
    console.log('Post Deleted');

    res.json( {message: 'Post Deleted' });
}
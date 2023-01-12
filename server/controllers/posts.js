import express from 'express';
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8; //posts per page
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);

 

        res.status(200).json({data:posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {  
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
        
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, 'i');//regExp for easy search of database

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') }}]});
        
        res.json( {data: posts});
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

export default router;
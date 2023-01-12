import express from 'express';

import { getPostsBySearch, getPosts, createPost, updatePost, deletePost, getPost } from '../controllers/posts.js'

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

export default router;
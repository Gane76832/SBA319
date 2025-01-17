const express = require('express');
const router = express.Router();
const Post = require('../models/post');


router.get('/', async (req, res) => {
  try { res.json(await Post.find({}).populate('author')); }
  catch (err) { res.status(500).json({ error: err.message }); }
});


router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author');
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
  } catch (err) { res.status(500).json({ error: err.message }); }
});


router.post('/', async (req, res) => {
  try { res.status(201).json(await Post.create(req.body)); }
  catch (err) { res.status(400).json({ error: err.message }); }
});


router.patch('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
  } catch (err) { res.status(400).json({ error: err.message }); }
});


router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', post });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;

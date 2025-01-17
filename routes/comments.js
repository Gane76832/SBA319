const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');


router.get('/', async (req, res) => {
  try { res.json(await Comment.find({}).populate('post commenter')); }
  catch (err) { res.status(500).json({ error: err.message }); }
});


router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('post commenter');
    if (!comment) return res.status(404).json({ error: 'Not found' });
    res.json(comment);
  } catch (err) { res.status(500).json({ error: err.message }); }
});


router.post('/', async (req, res) => {
  try { res.status(201).json(await Comment.create(req.body)); }
  catch (err) { res.status(400).json({ error: err.message }); }
});


router.patch('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!comment) return res.status(404).json({ error: 'Not found' });
    res.json(comment);
  } catch (err) { res.status(400).json({ error: err.message }); }
});


router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', comment });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;

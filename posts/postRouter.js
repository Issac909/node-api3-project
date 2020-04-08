const express = require('express');
const posts = require('./post-model');
const router = express.Router();

// Custom middleware can be found in the 'common' folder
const validatePostId = require('../common/validate-post-id');
const validatePost = require('../common/validate-post');

router.get('/', (req, res) => {
  posts
    .get()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ message: "could not find all posts", err }));

});

router.get('/:id', validatePostId, (req, res) => {
  posts
    .getById(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(404).json({message: 'could not find posts with this ID', err}))
  });

router.post('/', validatePost, (req, res) => {
  posts
    .insert(req.body)
    .then(post => res.status(201).json(post))
    .catch(err => console.log('This is a post error', err));
})

router.delete('/:id', validatePostId, (req, res) => {
  posts
    .remove(req.params.id)
    .then(post => {
    res.status(200).json({message:`post has been deleted`})
  })
  .catch(err => res.status(404).json({errorMessage: `cannot delete post`, err}))
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
  posts
    .update(req.params.id, req.text)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(404).json({ message: "could not update post", err }));
});

module.exports = router;

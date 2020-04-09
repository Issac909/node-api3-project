const express = require("express");
const users = require("./user-model");
const postRouter = require("../posts/postRouter");
const router = express.Router();

// Custom MiddlWare details can be found in the 'common' folder
const validateUser = require('../common/validate-user');
const validateUserId = require('../common/validate-id');
const validatePost = require('../common/validate-post');

router.use("/:id/posts", postRouter);

router.post("/", validateUser, (req, res) => {
  users
    .insert(req.body)
    .then(data => res.json(data))
    .catch(err =>
      res
        .status(404)
        .json({ errorMessage: "cannot post user at this time", err })
    );
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  posts
    .insert(req.text)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: "Post cannot be created" }));
});

router.get("/", (req, res) => {
  users
    .get()
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ message: "could not find users" }));
});

router.get("/:id", validateUserId, (req, res) => {
  users
    .getById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res
        .status(404)
        .json({ message: "could not find users with this ID", err })
    );
});

router.delete("/:id", validateUserId, (req, res) => {
  users
    .remove(req.params.id)
    .then(user => {
      res.status(200).json({ message: `user has been deleted` });
    })
    .catch(err => res.status(404).json({ errorMessage: `cannot delete user` }));
});

router.put("/:id", validateUser, validateUserId, (req, res) => {
  users
    .update(req.params.id, req.user)
    .then(data => res.json(data))
    .catch(err =>
      res.status(404).json({ errorMessage: `could not update this user `, err })
    );
});

module.exports = router;

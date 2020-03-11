const posts = require('../posts/postDb');

module.exports = function validatePostId() {
  posts
    .getById(req.params.id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: `post ID not found ` });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "server error, cannot find post", err });
    });
};

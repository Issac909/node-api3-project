module.exports = function validatePosts(req, res, next) {
    resource = {
      text: req.body.text
    };

    if(!req.body.text){
      return res.status(404).json({errorMessage: `missing post data `})
    } else {
      req.text = resource
      next()
    };
};

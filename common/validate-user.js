
module.exports = function validateUser(req, res, next) {
    resource = {
        name: req.body.name
      };
  
      if (!req.body.name) {
        return res.status(404).json({ message: "missing user data" });
      } else {
        req.user = resource;
        next();
      }
};

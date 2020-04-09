module.exports = function logger(req, res, next) {
    const method = req.method;
    const endpoint = req.originalUrl;

    console.log(`${method} request to ${endpoint}`)

    next();
}
const express = require('express');
const server = express();

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const logger = require('./common/logger-middleware');

server.use(express.json());

server.use(logger);

server.use('/users', logger, userRouter);
server.use('/posts', logger, postRouter);


server.get('/', (req, res, next) => {
  const nameInsert = (req.name) ? `${req.name}` : "";
  res.send(`<h2>Let's write some middleware ${nameInsert}!</h2>`);
});

server.use(function notFound(req, res, next) {
  res
    .status(404)
    .json({ message: "Opps, did not find what you're looking for" })
    .send(`<image src = 'https://imgur.com/iguRQk8' />`);
})

module.exports = server;

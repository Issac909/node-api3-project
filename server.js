const express = require('express');

const cors = require('cors');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const logger = require('./common/logger-middleware');

const server = express();
// Middleware
server.use(express.json());
server.use(cors());
server.use(logger);

server.use('/users', logger, userRouter);
server.use('/posts', logger, postRouter);

server.get('/', (req, res, next) => {
  const nameInsert = (req.name) ? `${req.name}` : "";
  res.setHeader({
    ...res.headers,
    ContentType: 'text/html'
  });
  res.send(`<h2>Let's write some middleware ${nameInsert}!</h2>`);
});

server.use(function notFound(req, res, next) {
  res
    .status(404)
    .json({ message: "Opps, did not find what you're looking for" })
})

module.exports = server;

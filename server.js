const express = require('express');

const server = express();

// your code here
server.use(express.json()); 

const accountsRouter = require('./accountsRouter'); // importing accounts module
server.use('/api/accounts', accountsRouter);


// safety first!
server.use((err, req, res, next) => {
  res.status(500).json({
    message: "Bad Panda",
    err
  });
})

module.exports = server;
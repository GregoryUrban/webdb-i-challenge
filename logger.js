require('dotenv').config(); // add the library "yarn add dotenv", then add this as first line of code

// const PORT = 4000;
const PORT = process.env.PORT || 4000;

function logger(req, res, next) {
    console.log(`
    URL: http://localhost:${PORT}${req.originalUrl}
    ${new Date().toISOString()}: ${req.method} to ${req.url}`)
    next()
  };
module.exports = logger
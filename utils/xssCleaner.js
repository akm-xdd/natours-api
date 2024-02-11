const xss = require('xss');

module.exports = options => {
  // for now, options don't do anything
  return (req, res, next) => {
    // run each key in req.body through a filter
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    });
    next();
  };
};

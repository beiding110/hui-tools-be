module.exports = function(app) {
  app.use('/user', require('./user'));
  app.use('/data', require('./data'));

  return app;
};

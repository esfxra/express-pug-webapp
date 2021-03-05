const index = require('../routes/index');
const auth = require('../routes/auth');
const stories = require('../routes/stories');

module.exports = (app) => {
  app.use('/', index);
  app.use('/auth', auth);
  app.use('/stories', stories);
};

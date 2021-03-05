const session = require('express-session');
const MongoStore = require('connect-mongo').default;

module.exports = (app) => {
  // Sessions - with a mongo store for storing sessions in the database
  app.use(
    session({
      secret: 'keyboard-cat-pillow',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    })
  );
};

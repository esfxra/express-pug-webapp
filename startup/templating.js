const express = require('express');
const path = require('path');

module.exports = (app) => {
  // Set pug as the templating engine
  app.set('views', './views');
  app.set('view engine', 'pug');

  // Static resources
  app.use(express.static(path.join(__dirname, '../public')));
};

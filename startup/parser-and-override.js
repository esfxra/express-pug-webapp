const express = require('express');
const methodOverride = require('method-override');

module.exports = (app) => {
  // Body parser
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Method override
  app.use(
    methodOverride((req, res) => {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // Look in urlencoded POST bodies and delete it
        let method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );
};

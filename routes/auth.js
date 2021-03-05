const express = require('express');
const passport = require('passport');

const router = express.Router();

// @desc    Authenticate with Google
// @route   GET /google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc    Call for Google Authentication
// @route   GET /google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function (req, res) {
    // Redirect to the dashboard if authentication is successful
    res.redirect('/dashboard');
  }
);

// @desc    Logout a user
// @route   GET /google/callback
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;

const express = require('express');
const { ensureGuest, ensureAuth } = require('../middleware/auth');
const Story = require('../models/Story');

const router = express.Router();

// @desc    Login / Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login');
});

// @desc    Dashboard - Show the user's stories
// @route   GET /
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    // The 'lean' function converts from a MongooseObject to JS Object
    const stories = await Story.find({ user: req.user.id }).lean();

    res.render('dashboard', {
      name: req.user.firstName,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render('500');
  }
});

module.exports = router;

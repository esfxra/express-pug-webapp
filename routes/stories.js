const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const User = require('../models/User');
const Story = require('../models/Story');

const router = express.Router();

// @desc    Show a feed of published stories
// @route   GET /stories
router.get('/feed', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: 'published' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean();

    res.render('stories/feed', { stories });
  } catch (err) {
    console.log(err);
    res.render('error/500');
  }
});

// @desc    Show a single story (complete)
// @route   GET /stories
router.get('/show/:id', ensureAuth, async (req, res) => {
  try {
    const story = await Story.findOne({ _id: req.params.id })
      .populate('user')
      .lean();

    if (story) {
      res.render('stories/show', { story });
    } else {
      res.render('error/404');
    }
  } catch (err) {
    console.log(err);
    res.render('error/500');
  }
});

// @desc    Show more user stories
// @route   GET /stories
router.get('/user/:id', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.params.id }).lean();
    const user = await User.findOne({ _id: req.params.id }).lean();

    if (stories) {
      res.render('stories/user', { user, stories });
    } else {
      res.render('error/404');
    }
  } catch (err) {
    console.log(err);
    res.render('error/500');
  }
});

// @desc    Story 'add' page
// @route   GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add');
});

// @desc    Add a new story
// @route   POST /stories/add
router.post('/add', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.render('error/500');
  }
});

// @desc    Show the 'edit' page
// @route   GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).lean();
    res.render('stories/edit', { story });
  } catch (err) {
    console.error(err);
    res.render('error/404');
  }
});

// @desc    Edit a story
// @route   PUT /stories/edit/:id
router.put('/edit/:id', ensureAuth, async (req, res) => {
  try {
    // Make sure the story exists one more time
    let story = await Story.findById(req.params.id).populate('user').lean();
    if (!story) {
      res.render('error/404');
    }

    // Make sure the user is the story's author
    if (req.user.id != story.user._id) {
      res.redirect('/stories/feed');
    } else {
      // Confirmed that the user is the author ... Update the story
      story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });

      res.redirect('/dashboard');
    }
  } catch (err) {
    console.log(err);
    res.render('error/500');
  }
});

// @desc    Delete a story
// @route   DELETE /stories/delete/:id
router.delete('/delete/:id', ensureAuth, async (req, res) => {
  try {
    await Story.remove({ _id: req.params.id });
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.render('error/500');
  }
});

module.exports = router;

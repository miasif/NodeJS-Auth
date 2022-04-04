const express = require('express');
const router = express.Router();
const {
  requireSignin,
  isAuth,
  isAdmin,
} = require('./../api/controller/authController');
const { userById } = require('../controllers/userController');

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.param('userId', userById);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  requireSignin,
  isAuth,
  isAdmin,
} = require('./../api/controller/authController');
const { userById } = require('../controllers/userController');
const { getLogin, postLogin } = require('./../controllers/authController');
router.get('/', getLogin);
router.post('/', postLogin);

module.exports = router;

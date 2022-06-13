const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const controller = require('../controllers/auth');

const router = express.Router();

router.post('/join', isNotLoggedIn, controller.join);
router.post('/login', isNotLoggedIn, controller.login);
router.get('/logout', isLoggedIn, controller.logout);


module.exports = router;

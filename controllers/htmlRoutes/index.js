const router = require('express').Router();
const {User} = require('../../models');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;
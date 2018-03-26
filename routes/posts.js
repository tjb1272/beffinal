const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../authorize/auth');
const post = require('../models').Post;

router.post('/register', ensureAuthenticated, (req, res) => {
    db.Post.create({ title: req.body.title, UserId: req.user.id })
        .then(result => {
            res.status(200).json({
                title: title,
                post: result
            });
        });
});

module.exports = router;

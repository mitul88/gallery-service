const router = require('express').Router();
const {like, removeLike} = require('./like.controller')


router.route('/')
    .get(like)
    .delete(removeLike);

module.exports = router;
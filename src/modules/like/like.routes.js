const router = require('express').Router();
const {like, removeLike, likeCounts} = require('./like.controller')


router.route('/')
    .post(like)
    .delete(removeLike);
router.route('/counts/:imageId')
    .get(likeCounts)

module.exports = router;
const router = require('express').Router();
const {like, removeLike, likeCounts} = require('./like.controller')
const {auth} = require('../../middleware/auth.middleware')


router.route('/')
    .post([auth.authCheck], like)
    .delete([auth.authCheck], removeLike);
router.route('/counts/:imageId')
    .get(likeCounts)

module.exports = router;
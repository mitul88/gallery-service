const { comment, editComment, deleteComment, getComments } = require('./comment.controller');

const router = require('express').Router();
const {auth} = require('../../middleware/auth.middleware');

router.route('/')
    .post([auth.authCheck], comment)
    .delete([auth.authCheck], deleteComment)
    .put([auth.authCheck], editComment);

router.route('/image-comments/:id')
    .get(getComments)

module.exports = router;
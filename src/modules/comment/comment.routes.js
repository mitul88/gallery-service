const { comment, editComment, deleteComment, getComments } = require('./comment.controller');

const router = require('express').Router();

router.route('/')
    .post(comment)
    .delete(deleteComment)
    .put(editComment);

router.route('/image-comments/:id')
    .get(getComments)

module.exports = router;
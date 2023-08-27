const { comment, editComment, deleteComment, getComments } = require('./comment.controller');

const router = require('express').Router();

router.route('/')
    .post(comment);

router.route('/:id')
    .put(editComment)
    .delete(deleteComment);

router.route('/image-comments/:id')
    .get(getComments)

module.exports = router;
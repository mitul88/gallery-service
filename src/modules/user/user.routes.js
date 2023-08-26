const router = require('express').Router();
const {getUser, createUser, updateUser, deleteUser} = require('./user.controller')

router.route('/create')
    .post(createUser);

router.route('/details')
    .get(getUser);

router.route('/update')
    .put(updateUser);

router.route('/delete')
    .delete(deleteUser);

module.exports = router;
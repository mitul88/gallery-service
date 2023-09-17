const router = require('express').Router();
const {getUser, updateUser, deactivate, changePassword} = require('./user.controller')


router.route('/:id')
    .get(getUser);

router.route('/change-password')
    .get(changePassword);

router.route('/deactivate')
    .get(deactivate);

router.route('/update')
    .put(updateUser);



module.exports = router;
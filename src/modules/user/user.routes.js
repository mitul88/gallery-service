const router = require('express').Router();
const {getUser, updateUser, deactivate, changePassword, uploadeProfilePicture} = require('./user.controller')


router.route('/:id')
    .get(getUser);

router.route('/upload_profile_photo/:id')
    .post(uploadeProfilePicture);

router.route('/change-password')
    .get(changePassword);

router.route('/deactivate')
    .get(deactivate);

router.route('/update')
    .put(updateUser);



module.exports = router;
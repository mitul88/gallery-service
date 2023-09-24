const router = require('express').Router();
const { ContentTypeMiddleware } = require('../../middleware/contentType.middleware');
const { singleProfilePhotoUpload } = require('../../upload/multerUpload');
const {getUser, updateUser, deactivate, changePassword, uploadeProfilePicture} = require('./user.controller')

router.route('/:id')
    .get(getUser);

router.route('/upload_profile_photo/:id')
    .post([ContentTypeMiddleware.formData, singleProfilePhotoUpload], uploadeProfilePicture);

router.route('/change-password')
    .get(changePassword);

router.route('/deactivate')
    .get(deactivate);

router.route('/update')
    .put(updateUser);



module.exports = router;
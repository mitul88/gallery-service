const router = require('express').Router();
const { ContentTypeMiddleware } = require('../../middleware/contentType.middleware');
const { singleProfilePhotoUpload } = require('../../upload/multerUpload');
const {getUser, updateUser, deactivate, changePassword, uploadeProfilePicture, singleUpdate, deleteProfilePhoto, changeProfilePhoto} = require('./user.controller')

router.route('/:id')
    .get(getUser);

router.route('/upload-profile-photo/:id')
    .post([ContentTypeMiddleware.formData, singleProfilePhotoUpload], uploadeProfilePicture);

router.route('/change-password/:userId')
    .post(changePassword);

router.route('/deactivate')
    .get(deactivate);

router.route('/update/:id')
    .put(updateUser);

router.route('/single-update/:userId')
    .patch(singleUpdate);

router.route('/profile-photo-delete/:userId')
    .delete(deleteProfilePhoto);

router.route('/change-profile-photo/:userId')
    .put([ContentTypeMiddleware.formData, singleProfilePhotoUpload], changeProfilePhoto);



module.exports = router;
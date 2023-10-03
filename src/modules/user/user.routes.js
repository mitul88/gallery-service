const router = require('express').Router();
const { ContentTypeMiddleware } = require('../../middleware/contentType.middleware');
const { auth } = require('../../middleware/auth.middleware');
const { singleProfilePhotoUpload } = require('../../upload/multerUpload');
const {getUser, updateUser, deactivate, changePassword, uploadeProfilePicture, singleUpdate, deleteProfilePhoto, changeProfilePhoto, changeBio, deleteBio} = require('./user.controller')

router.route('/:id')
    .get(getUser);

router.route('/upload-profile-photo/:id')
    .post([auth.authCheck, ContentTypeMiddleware.formData, singleProfilePhotoUpload], uploadeProfilePicture);

router.route('/change-password/:userId')
    .post([auth.authCheck], changePassword);

router.route('/deactivate')
    .get([auth.authCheck], deactivate);

router.route('/update/:id')
    .put([auth.authCheck], updateUser);

router.route('/single-update/:userId')
    .patch([auth.authCheck], singleUpdate);
    

router.route('/profile-photo-delete/:userId')
    .delete([auth.authCheck], deleteProfilePhoto);

router.route('/change-profile-photo/:userId')
    .put([auth.authCheck, ContentTypeMiddleware.formData, singleProfilePhotoUpload], changeProfilePhoto);

router.route('/delete-bio/:userId')
    .delete([auth.authCheck], deleteBio);



module.exports = router;
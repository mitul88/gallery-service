const router = require('express').Router();
const { ContentTypeMiddleware } = require('../../middleware/contentType.middleware');
const { auth } = require('../../middleware/auth.middleware');
const { singleImageUpload } = require('../../upload/multerUpload');
const {createImage, viewImage, deleteImage, imageList, editPhotoInfo} = require('./image.controller')


router.route('/')
    .get(imageList);

router.route('/:id')
    .get(viewImage)
    .put([auth.authCheck], editPhotoInfo)

router.route('/upload')
    .post([auth.authCheck, ContentTypeMiddleware.formData, singleImageUpload], createImage);

router.route('/delete-image/:imageId')
    .delete([auth.authCheck], deleteImage);


module.exports = router;
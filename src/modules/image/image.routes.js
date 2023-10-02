const router = require('express').Router();
const { ContentTypeMiddleware } = require('../../middleware/contentType.middleware');
const { singleImageUpload } = require('../../upload/multerUpload');
const {createImage, viewImage, deleteImage, imageList, editPhotoInfo} = require('./image.controller')


router.route('/')
    .get(imageList);

router.route('/:id')
    .get(viewImage)
    .put(editPhotoInfo)

router.route('/upload')
    .post([ContentTypeMiddleware.formData, singleImageUpload], createImage);

router.route('/delete-image/:imageId')
    .delete(deleteImage);


module.exports = router;
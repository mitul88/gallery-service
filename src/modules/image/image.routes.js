const router = require('express').Router();
const { ContentTypeMiddleware } = require('../../middleware/contentType.middleware');
const { singleImageUpload } = require('../../upload/multerUpload');
const {createImage, viewImage, deleteImage, imageList} = require('./image.controller')


router.route('/')
    .get(imageList);

router.route('/upload')
    .post([ContentTypeMiddleware.formData, singleImageUpload], createImage);

router.route('/view-image/:id')
    .get(viewImage);

router.route('/delete-image/:id')
    .delete(deleteImage);


module.exports = router;
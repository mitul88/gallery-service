const router = require('express').Router();
const { singleImageUpload } = require('../../upload/multerUpload');
const {createImage, viewImage, editImage, deleteImage} = require('./image.controller')

router.route('/upload',[singleImageUpload])
    .post(createImage);

router.route('/view-image')
    .get(viewImage);

router.route('/delete-image')
    .delete(deleteImage);

router.route('/edit')
    .put(editImage);



module.exports = router;
var express = require('express');
var router = express.Router();
var authController=require('../controllers/auth');
var applicationController = require('../controllers/application');
var fileController = require('../controllers/files');

router.get('/redirect',authController.authenticateSuccessFailure);
router.get('/login',authController.authenticate);
router.get('/logout',authController.logout);

router.get('/',authController.isUnAuthenticated,applicationController.index);
router.get('/dashboard',authController.isAuthenticated,applicationController.dashboard);
router.get('/failed',applicationController.error);

router.get('/profile',authController.isAuthenticated,applicationController.profile);
router.get('/myfiles',authController.isAuthenticated,fileController.myFiles);
router.post('/fileupload',authController.isAuthenticated,fileController.fileUpload);
module.exports = router;

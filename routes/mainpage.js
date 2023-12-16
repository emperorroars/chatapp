const express = require("express");
const mainpageController = require('../controllers/mainpage');
const router = express.Router();
router.get('/',mainpageController.getsignupPage);
router.get('/login',mainpageController.getloginPage);
router.get('/chat',mainpageController.getchat);
//router.get('/forgotpassword',mainpageController.getforgotpassword);
module.exports = router;
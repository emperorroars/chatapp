const express = require("express");
const mainpageController = require('../controllers/mainpage');
const router = express.Router();
router.get('/',mainpageController.getsignupPage);
router.get('/login',mainpageController.getloginPage);
router.get('/pagechat',mainpageController.getchat);
router.get("/creategroup", mainpageController.creategroup);
router.get("/updategroup", mainpageController.updategroup);
router.get("/forgotpassword",mainpageController.getforgotpassword)
module.exports = router;
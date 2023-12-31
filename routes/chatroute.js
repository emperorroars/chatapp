const express=require('express')
const chatcontrollers = require('../controllers/chatcontrollers')
const userauthentication=require('../middleware/auth')
const multerMiddleware = require('../middleware/multer')
const upload = multerMiddleware.multer.single('image');
const router=express.Router()
console.log("chat is working")
router.post('/',userauthentication.authenticate,chatcontrollers.add)
router.post('/image',userauthentication.authenticate,upload,chatcontrollers.saveChatImages)
//router.delete('/deleteexpense/:id',userauthentication.authenticate,expensecontrollers.delete)
//router.put('/:id',expensecontrollers.edit)
router.get('/',userauthentication.authenticate,chatcontrollers.get)
router.get("/groupdetails", userauthentication.authenticate, chatcontrollers.groupdetails);
//router.get('/download',userauthentication.authenticate,expensecontrollers.downloadexpense)

module.exports=router
const express=require('express')
const chatcontrollers = require('../controllers/chatcontrollers')
const userauthentication=require('../middleware/auth')
const router=express.Router()
console.log("chat is working")
router.post('/',userauthentication.authenticate,chatcontrollers.add)
//router.delete('/deleteexpense/:id',userauthentication.authenticate,expensecontrollers.delete)
//router.put('/:id',expensecontrollers.edit)
//router.get('/',userauthentication.authenticate,expensecontrollers.get)
//router.get('/download',userauthentication.authenticate,expensecontrollers.downloadexpense)

module.exports=router
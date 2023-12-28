const express = require("express");
const groupcontrollers  = require("../controllers/groupcontrollers");
const userauthentication = require("../middleware/auth");
console.log("it has entered group route")
const router = express.Router();
router.get("/", groupcontrollers.getUserController);
router.post("/",userauthentication.authenticate, groupcontrollers.postGroupController);
router.get("/grouplist",userauthentication.authenticate,groupcontrollers.getGroupController);
router.post("/update",userauthentication.authenticate, groupcontrollers.updateGroupController);
router.delete("/remove", groupcontrollers.removeGroupController);
router.get("/update/finduser",userauthentication.authenticate,groupcontrollers.finduserController)
router.get("/update/findmember",userauthentication.authenticate,groupcontrollers.findmemberController)
module.exports = router;

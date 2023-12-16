const Chat=require('../models/chat')
const User = require('../models/user');
const sequelize = require('../utils/database');
exports.add = (req, res, next) => {
    console.log("adding")
      console.log("see the user now", req.user);
      console.log("see the body now", req.body);
      console.log(req.body.description);
      console.log("see the id now", req.user.id);
  
       Chat.create({
        message: req.body.message,
        })
        .then(()=>{
            res.status(200).json({ success: true, message: "Success" });

        })
     .catch ((err)=> {
     
      console.log("failed", err);
      return res.status(500).json({ success: false, error: err });
    })
  };
  
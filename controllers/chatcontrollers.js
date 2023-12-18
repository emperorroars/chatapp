const Chat=require('../models/chat')
const User = require('../models/user');
const sequelize = require('../utils/database');
const Sequelize=require("sequelize")
exports.add = (req, res) => {
    console.log("adding")
      console.log("see the user now", req.user);
      console.log("see the body now", req.body);
      console.log("see the id now", req.user.id);
  
       Chat.create({
        message: req.body.message,
        name:req.user.name,
        userId:req.user.id

        })
        .then(()=>{
            res.status(200).json({ success: true, message: "Success" });

        })
     .catch ((err)=> {
     
      console.log("failed", err);
      return res.status(500).json({ success: false, error: err });
    })
  };
  exports.get=(req,res)=>{
    console.log("this is the req",req.params)
    Chat.findAll({
      where: {
        id: {
          [Sequelize.Op.gt]: req.params.id
        }
      }
    })
      .then(chats => {
        res.json(chats);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching expenses' });
      });
  };

  
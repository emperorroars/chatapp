const Chat=require('../models/chat')
const User = require('../models/user');
const Group = require("../models/group");
const sequelize = require('../utils/database');
const awsService = require('../middleware/awsservices');
const Sequelize=require("sequelize")
exports.add = (req, res) => {
    console.log("adding")
      console.log("see the user now", req.user);
      console.log("see the body now", req.body);
      console.log("see the id now", req.user.id);
  
       Chat.create({
        message: req.body.message,
        name:req.user.name,
        userId:req.user.id,
        groupId:req.body.groupId

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
    console.log("this is the req",req.query)
    Chat.findAll({
      include: {
        model: Group,
        attributes: ["id", "groupname", "createdby"],
      },
      where: {
        id: {
          [Sequelize.Op.gt]: req.query.id,
        },
        groupId: req.query.groupId,
      },
    })
      .then((data) => {
        res.json(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching chats" });
      });
  };
  exports.groupdetails = (req, res) => {
    console.log("this is the req of groupdetails", req.query);
    Group.findOne({
      where: {
        id:req.query.groupId,
      },
    })
      .then((data) => {
        res.json(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching chats" });
      });
  };
  exports.saveChatImages = async (request, response, next) => {
    try {
        const user = request.user;
        const image = request.file;
        console.log("this is image",request,image)
        const  groupId  = request.body.GroupId;
        const filename = `chat-images/group${groupId}/user${user.id}/${image.originalname}`;
        const imageUrl = await awsService.uploadToS3(image.buffer, filename)
    
        
            await user.createChat({
                message: imageUrl,
                groupId,
              name:request.user.name,
              isImage: true
            })
      

        return response.status(200).json({ message: "image saved to database succesfully" })

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Internal Server error!' })
    }
}

  
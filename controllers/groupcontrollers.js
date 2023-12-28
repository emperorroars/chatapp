const { Op } = require("sequelize");
const User = require("../models/user");
const Group = require("../models/group");
const UserGroup = require("../models/usergroup");

exports.getUserController=async(req,res)=>{
   // console.log(req.query);
    console.log("this has been called")
    const { count, rows } = await User.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${req.query.name}%`
          }
        },
        attributes:['id','name'],
        offset: 0,
        limit: 10
      });
      console.log(count);
      console.log(rows);
    res.send({message:'hello get user controller',data:rows})
}
module.exports.postGroupController = async (req, res) => {
  try {
    console.log(req.body);
    console.log("find the id",req.user.id)
    const { groupname, userList } = req.body;
    //console.log("this is userlist">>user)
    // userList.add(tokenObj.id);
    const list = new Set();
    userList.forEach((ele) => list.add(ele));
    //list.add(tokenObj.id);
    console.log("this is the list>",list)
    const data = await Group.create({ groupname, createdby: req.user.id });
    console.log(`8`);
    let arr = Array.from(list);
    console.log(arr)
    await data.addUsers(arr);
   /* const addadmin = await data.addAdmin(tokenObj.id);
    console.log(`18`);
    console.log(addadmin);*/
    res.json({ message: "post group controller", data });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.getGroupController = async (req, res) => {
  console.log("this is getgroupcontroller",req.body);
  //const user = req.user;
  //const groupList = await user.getGroups();
  const groupList = await User.findAll({
    include: {
      model: Group,
      attributes: ["id", "groupname", "createdby"],
    },
    where: {
      id: req.user.id,
    },
    attributes: ["id", "name", "email", "phoneno"],
  });
  res.json({ message: "get group controller", groupList });
};
module.exports.updateGroupController = async (req, res) => {
  console.log("this is updateGroupController",req.body);
   const { addgroupList, groupId } = req.body;
   console.log(req.body)
   const list = new Set();
    addgroupList.forEach((ele) => list.add(ele));
    console.log("this is the list>",list)
    let arr = Array.from(list);
    console.log(arr)
     const data = await Group.findOne({ where: { id: req.body.groupId }});
     console.log(data)
     await data.addUsers(arr);
   // await UserGroup.create({userId:arr,groupId});
   
  res.json({ message: "updated group controller" });
};
module.exports.removeGroupController = async (req, res) => {
  console.log("this is removeGroupController",req.query);
   //const { deletegroupList, groupId } = req.body;
  // const list = new Set();
  //  deletegroupList.forEach((ele) => list.add(ele));
   // console.log("this is the list>",list)
   // let arr = Array.from(list);
  //  console.log(arr)
   await UserGroup.destroy({
    where: {
        userId: req.query.userId,
        groupId: req.query.groupId
    }
});
   
  res.json({ message: "updated group controller" });
};
exports.finduserController=async(req,res)=>{
   // console.log(req.query);
    console.log("this has been called")
    const data = await User.findAll()
      res.send({message:'hello get updateduser controller',data})

}
exports.findmemberController=async(req,res)=>{
    console.log(req.query);
    console.log("this has been called")
    const data = await UserGroup.findAll({ where: { groupId: req.query.groupId }})
      res.send({message:'hello get updateduser controller',data})

}
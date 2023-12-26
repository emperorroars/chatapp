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
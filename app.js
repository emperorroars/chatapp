require('dotenv').config();
const mainPageRouter = require('./routes/mainpage');
const sequelize = require('./utils/database');
const User = require('./models/user')
const Chat = require('./models/chat')
const Group=require('./models/group')
const Usergroup=require('./models/usergroup')
const auth = require('./middleware/auth')
const express = require("express")
const path = require("path")
const cors = require("cors")
const userroutes = require(`./routes/userroutes`)
const chatroute = require(`./routes/chatroute`)
const grouproutes = require(`./routes/grouproutes`);
const app = express()
app.use(cors({
   origin: "http://localhost:4000"
  
}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
User.hasMany(Chat)
Chat.belongsTo(User)
User.belongsToMany(Group, { through: Usergroup });
Group.belongsToMany(User, { through: Usergroup });
Group.hasMany(Chat);
Chat.belongsTo(Group);

app.use('/', mainPageRouter)
app.use('/user', userroutes)
app.use('/chat', chatroute)
app.use('/group', grouproutes);
sequelize.sync()
    .then(() => {
        console.log('Database tables have been created.');
        app.listen(process.env.PORT, () => {
            console.log("Server is running");
        });
    })
    .catch((err) => {
        console.error('Error creating database tables:', err);
    });

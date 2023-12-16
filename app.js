require('dotenv').config();
const mainPageRouter = require('./routes/mainpage');
const sequelize = require('./utils/database');
const User = require('./models/user')
const Chat = require('./models/chat')
const auth = require('./middleware/auth')
const express = require("express")
const path = require("path")
const cors = require("cors")
const userroute = require(`./routes/userroute`)
const chatroute = require(`./routes/chatroute`)
const app = express()
app.use(cors({
   origin: "http://localhost:4000"
  
}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
User.hasMany(Chat)
Chat.belongsTo(User)
app.use('/', mainPageRouter)
app.use('/user', userroute)
app.use('/chat', chatroute)
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

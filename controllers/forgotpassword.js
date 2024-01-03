const Sib = require("sib-api-v3-sdk");
const path = require("path");
const { createTransport } = require("nodemailer");
const User = require("../models/user");
const Forgotpassword = require("../models/forgotpassword");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');

exports.forgotpassword = async (req, res) => {
  console.log("this is the request",req)
  try {
    const result = await User.findOne({
      where: { email: req.body.email }
    });
    console.log("this is result",result);
    const uuid = uuidv4();
    console.log(uuid);
    if (result !== null) {
      const obj = {
        userId: result.id,
        isActive: true,
        uuid: uuid,
      };
      console.log(obj);
      const forgotResult = await Forgotpassword.create(obj);
      console.log("object created", forgotResult);
    const defaultClient = Sib.ApiClient.instance;

      const apiKey = defaultClient.authentications["api-key"];
      apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
      console.log(`forget 10`);
      console.log(process.env.SENDINBLUE_SMTP_KEY);

      const transporter = createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: {
          user: "DAEMOSARES@GMAIL.COM",
          pass: process.env.SENDINBLUE_SMTP_KEY,
        },
      });
      console.log(req.body.email);
      const mailOptions = {
        from: "DAEMOSARES@GMAIL.COM",
        to: req.body.email,
        subject: `Your subject`,
        text: `Your reset link is - http://localhost:4000/password/resetpassword/${uuid}

        This is valid for 1 time only.`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(202).json({ message: "A reset link send to your email id" });
        }
      });
    } else {
      res.json({ message: "Invalid email id", status: 501 });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.resetpassword = (req, res) => {
 // console.log("this is the request",req)
  const id = req.params.uuid;
  console.log("this is the id",id)
  Forgotpassword.findOne({ where: { uuid:id} }).then(forgotpasswordrequest => {
    if (forgotpasswordrequest) {
      forgotpasswordrequest.update({ isActive: false });
      res.status(200).send(`<html>
                                  <script>
                                      function formsubmitted(e){
                                          e.preventDefault();
                                          console.log('called')
                                      }
                                  </script>

                                  <form action="/password/updatepassword/${id}" method="get">
                                      <label for="newpassword">Enter New password</label>
                                      <input name="newpassword" type="password" required></input>
                                      <button>reset password</button>
                                  </form>
                              </html>`
      )
      res.end()

    }
  })
}

exports.updatepassword = (req, res) => {

  try {
   // console.log("this is request inside reset",req)
    const { newpassword } = req.query;
    console.log("this is the new password",newpassword)
    const  resetpasswordid  = req.params.uuid;
    console.log("this is the  resetpassword",req.params,resetpasswordid)
    Forgotpassword.findOne({ where: { uuid: resetpasswordid } }).then(resetpasswordrequest => {
      User.findOne({ where: { id: resetpasswordrequest.userId } }).then(user => {
        // console.log('userDetails', user)
        if (user) {
          //encrypt the password

          const saltRounds = 10;
          bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
              console.log(err);
              throw new Error(err);
            }
            bcrypt.hash(newpassword, salt, function (err, hash) {
              // Store hash in your password DB.
              if (err) {
                console.log(err);
                throw new Error(err);
              }
              user.update({ password: hash }).then(() => {
                res.status(201).json({ message: 'Successfuly update the new password' })
              })
            });
          });
        } else {
          return res.status(404).json({ error: 'No user Exists', success: false })
        }
      })
    })
  } catch (error) {
    return res.status(403).json({ error, success: false })
  }

}

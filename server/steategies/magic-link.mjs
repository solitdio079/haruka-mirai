import passport from 'passport'
import MagicLink from 'passport-magic-link'
import Users from '../models/users.mjs'
import {} from 'dotenv/config'
import mongoose from 'mongoose'
import brevo from '@getbrevo/brevo'

const MagicLinkStrategy = MagicLink.Strategy
// set the email parameters up
let defaultClient = brevo.ApiClient.instance

let apiKey = defaultClient.authentications['api-key']

let apiInstance = new brevo.TransactionalEmailsApi()

apiKey.apiKey = process.env.BREVO_API_KEY;

let sendSmtpEmail = new brevo.SendSmtpEmail()


 



passport.use(
  new MagicLinkStrategy(
    {
      secret: 'keyboard cat',
      userFields: ['email','id'],
      tokenField: 'token',
      verifyUserAfterToken: true,
    },
    function send(user, token) {
       var link = 'http://localhost:5500/auth/login/email/verify?token=' + token
       sendSmtpEmail.subject = 'Login to Haruka Mirai!'
       sendSmtpEmail.htmlContent =
         '<h3>Hello!</h3><p>Click the link below to finish signing in to Haruka Mirai.</p><p><a href="' +
         link +
         '">Sign in</a></p>'
       sendSmtpEmail.sender = {
         name: 'Solitdio',
         email: process.env.SENDER_EMAIL,
       }
       sendSmtpEmail.to = [{ email: user.email }]
       sendSmtpEmail.replyTo = {
         email: process.env.SENDER_EMAIL,
         name: 'Solitdio',
       }

       apiInstance.sendTransacEmail(sendSmtpEmail).then(
         function (data) {
           console.log(
             'API called successfully. Returned data: ' + JSON.stringify(data)
           )
         },
         function (error) {
           console.error(error)
         }
       )
    },
    async function verify(user) {
      try {
        const check = await Users.findOne({ email: user.email })
        if (!check) {
          const userPrototype = { email: user.email }
           console.log(user.id)
           if (user.id !== "no guest") {
             user.id = mongoose.Types.ObjectId.createFromHexString(user.id)
           } else {
             user.id = new mongoose.Types.ObjectId()
           }
           userPrototype._id = user.id
           
          const newUser = new Users(userPrototype)
          await newUser.save()
          return new Promise(function (resolve, reject) {
            return resolve(newUser)
          })
        }
        return new Promise(function (resolve, reject) {
          return resolve(check)
        })
      } catch (error) {
        return new Promise(function (resolve, reject) {
          return reject(error.message)
        })
      }
    }
  )
)
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, email: user.email, isAdmin: user.isAdmin, fullName: user.fullName, picture: user.picture, phone: user.phone })
  })
})

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    //console.log(`Inside Deserializer:  ${JSON.stringify(user)}`);
    return cb(null, user)
  })
})
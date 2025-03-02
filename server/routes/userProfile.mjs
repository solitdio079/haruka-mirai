import express, { Router } from 'express'
import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs'
import Users from "../models/users.mjs"


// Setting the destination path for product photos
const root = path.resolve()
const destination = path.join(root, '/public/users/')

// Initializing multer diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destination)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extension = file.mimetype.split('/')[1]
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
  },
})
const upload = multer({ storage })
const router = Router()

const checkIfConnected = (req, res, next) => {
  req.user ? next() : res.send({ error: 'Your are not an connected!' })
}

router.use(checkIfConnected)

router.patch("/:id", upload.none("picture"),async (req, res) => {
    const { id } = req.params
    const { email, fullName, phone } = req.body
    
    try {
        const user = await Users.findById(id)
        if (!user) return res.send({ error: `User with ID:${id} not found` })
        
        user.email = email
        user.fullName = fullName
        user.phone = phone

        await Users.findByIdAndUpdate(id, user)
        return res.send({ msg: 'User updated with success!' })
    } catch (error) {
        return res.send({error: error.message})
    }
})

router.put("/:id", upload.single("picture"), async (req, res) => {
    
    // Check for upload
    if (!req.file) console.log(req.body)
    const { id } = req.params
    const { email, fullName, phone } = req.body
     try {
       const user = await Users.findById(id)
       if (!user) return res.send({ error: `User with ID:${id} not found` })

       user.email = email
       user.fullName = fullName
         user.phone = phone
         if (
           user.picture !==
           'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
         ) {
             fs.unlinkSync(user.picture)
         }
          
           user.picture = "http://localhost:5500/users/" + req.file.filename
         

         await Users.findByIdAndUpdate(id, user)
         return res.send({msg: 'User updated with success!'})
     } catch (error) {
       return res.send({ error: error.message })
     }
})


export default router
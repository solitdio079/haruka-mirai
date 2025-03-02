import express,{ Router } from 'express'
import Addresses from '../models/addresses.mjs'

const router = Router()
const checkIfConnected = (req, res, next) => {
  req.user ? next() : res.send({ error: 'Your are not an connected!' })
}

router.use(checkIfConnected)

router.use(express.json())
// create an address
router.post("/", async (req, res) => {
    console.log(req.body)
    req.body.user_id = req.user.id
    try {
        const newAddress = new Addresses(req.body)
        await newAddress.save()
       // console.log(newAddress)
        return res.send({msg: 'Address Created with success', id:newAddress._id})
        
    } catch (error) {
        return res.send({error: error.message})
    }
})

// Get all the user's addresses

router.get("/", async (req, res) => {
    try {
        const userAddresses = await Addresses.find({ user_id: req.user.id })
        return res.send(userAddresses)
    } catch (error) {
        return res.send({error: error.message})
    }
})






export default router
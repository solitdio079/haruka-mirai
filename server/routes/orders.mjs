import express, { Router } from 'express'
import Orders from '../models/orders.mjs'


const router = Router()



router.get("/", async (req, res) => {
    const { cursor, limit } = req.query
    const query = {}
    if (!req.user.isAdmin) {
        query['user.user_id'] = req.user.id
    }
    if (cursor) {
        query._id = {$gt: cursor}
    }
    
    try {
        const data = await Orders.find(query,null, {limit: Number(limit), sort: {_id: -1}})
        return res.send(data)
        
    } catch (error) {
        return res.send({error: error.message})
    }
})

router.get("/:userId", async  (req, res)=> {
    const { userId } = req.params
     const { cursor, limit } = req.query
     const query = {"user.user_id": userId}
     if (cursor) {
       query._id = { $gt: cursor }
     }
    try {
        const userOrders = await Orders.find(query, null, { limit: Number(limit), sort: { _id: -1 } })
        return res.send(userOrders)
    } catch (error) {
        return res.send({error: error.message})
    }
    
})

// Get order according to date
router.get("/filter/:date", async (req, res) => {
      let { date } = req.params
      date = new Date(date)
    let datePlusOne = new Date(date)
    datePlusOne.setDate(date.getDate() + 1)
    //console.log(date ,datePlusOne)
    const { cursor, limit } = req.query
     const query = { createdAt: { $gte: date, $lt: datePlusOne.toISOString() } }
     if (!req.user.isAdmin) {
       query['user.user_id'] = req.user.id
     }
  
    if (cursor) {
        query._id = {$gt: cursor}
    }
    try {
        const orders = await Orders.find(query, null, { limit: Number(limit) })
        return res.send(orders)
    } catch (error) {
        return res.send({error: error.message})
    }
})

router.patch("/:id", async (req, res) => {
    const {id} = req.params
    const { status, shipping } = req.body
    
    // get order

    const order = await Orders.findById(id)
    if(!order) return res.send({error: 'Order does not exist'})
    if (status) {
        order.status = status
    }
    if (shipping) {
        order.shipping = shipping
    }

    // update order
    try {
        await Orders.findByIdAndUpdate(id, order)
        return res.send({msg: "Order updated!"})
    } catch (error) {
        return res.send({error: error.message})
    }
    
})



export default router
import express, {Router} from 'express'
import Cart from '../models/cart.mjs'
import Product from '../models/products/products.mjs'
import Furniture from '../models/products/furniture.mjs'
import Clothing from '../models/products/clothing.mjs'
import mongoose from 'mongoose'

const router = Router()


const checkIfConnected = (req, res, next) => {
  req.user 
    ? next()
    : res.send({ error: 'Your are not an connected!' })
}

//router.use(checkIfConnected)

// Add item to cart
router.use(express.json())
router.post('/', async (req, res) => {
    const user_id = req.user
      ? req.user.id
      : req.body.user_id 
      ? req.body.user_id
      : new mongoose.Types.ObjectId()
    const { itemId, qty } = req.body

    
    // Get the product
    const item =(await Product.findById(itemId)) || (await Furniture.findById(itemId)) || (await Clothing.findById(itemId))
    
    if (!item) return res.send({ error: 'No product found by that ID!' })
    
    // Calculate the subtotal of the new item
    const price = item.onSale ? parseFloat(item.price - (item.price * (item.onSale.discount_rate / 100))).toFixed(2) : item.price
    const subtotal = price * Number(qty)
   
    // Get the cart based on the use
    let existingCart = await Cart.find({ user_id })
    const newItem = {
        id:itemId,
        name: item.name,
        price: price,
        qty: qty,
      image: item.images.split(';')[0],
        maxQty: item.qty
    }
    if (item.size) {
      newItem.size = item.size
    }
  if (req.body.size && Boolean(req.body.size) === true) {
    newItem.size = req.body.size
  }
    if (existingCart.length > 0) {
        // Check if product already exists

        existingCart = existingCart[0]
        if (existingCart.items.filter(item => item.id === itemId).length>0) return res.send({error: 'Product already in cart!'})
        existingCart.items.push(newItem)
        existingCart.subtotal = existingCart.items
          .map((item) => parseFloat(item.price * parseFloat(item.qty)))
          .reduce((acc, curr) => (acc += curr), 0).toFixed(2)
        
       
        try {
            //console.log(existingCart.subtotal)
            await Cart.findByIdAndUpdate(existingCart._id, existingCart)
            return res.send({msg: "Cart updated"})
        } catch (error) {
            return res.send({error: error.message})
        }
        
    }
        try {
            const items = [newItem]
            const newCart = new Cart({ user_id, items, subtotal })
          await newCart.save()
          console.log(user_id)
            return res.send({msg: 'Cart created!',user_id})
        } catch (error) {
            return res.send({error: error.message})
        }
    

})

router.get("/", async (req, res) => {
  const { guest } = req.query
  const query = {user_id: null}
  if (guest) {
    query.user_id = guest
  }
  if (req.user) {
     query.user_id = req.user.id
  }
    try {
      const cart = await Cart.findOne(query)
      if(!cart) return res.send({error: 'No items!'})
      return res.send(cart)

    } catch (error) {
        return res.send({error: error.message})
    }
})

// Update item quantity

router.patch("/:id", async (req, res) => {
    const { id } = req.params
    const { itemId,qty } = req.body
    
    //Get the cart
    const existingCart = await Cart.findById(id)
    if (!existingCart) return res.send({ error: `No cart found with the ID: ${id}` })
  
    //Check if qty is available
    //const product = await Product.findById(itemId)
    if(Number(existingCart.maxQty) < Number(qty)) return res.send({error: `This quantity is not in stock`})
    
    // Get the item index from cart
    const itemIndex = existingCart.items.findIndex(item => item.id === itemId)
    // Update the quantity for the item
    existingCart.items[itemIndex].qty = qty
    // Update the subtotal to reflect the new quantity
    existingCart.subtotal = existingCart.items.map(item => parseFloat(item.price * parseFloat(item.qty))).reduce((acc, curr) => acc += curr, 0)
    
    // update cart
    try {
        await Cart.findByIdAndUpdate(id, existingCart)
        return res.send({msg: 'Quantity updated with success!'})
    } catch (error) {
        return res.send({error: error.message})
    }
})

// Update item size
router.patch('/size/:id', async (req, res) => {
  const { id } = req.params
  const { itemId, size } = req.body

  //Get the cart
  const existingCart = await Cart.findById(id)
  if (!existingCart)
    return res.send({ error: `No cart found with the ID: ${id}` })

  // Get the item index from cart
  const itemIndex = existingCart.items.findIndex((item) => item.id === itemId)
  // Update the quantity for the item
  existingCart.items[itemIndex].size = size
  // Update the subtotal to reflect the new quantity
  existingCart.subtotal = existingCart.items
    .map((item) => parseFloat(item.price * parseFloat(item.qty)))
    .reduce((acc, curr) => (acc += curr), 0)

  // update cart
  try {
    await Cart.findByIdAndUpdate(id, existingCart)
    return res.send({ msg: 'Size updated with success!' })
  } catch (error) {
    return res.send({ error: error.message })
  }
})


// Delete item form cart
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  const { itemId } = req.query
  // Find cart
  const existingCart = await Cart.findById(id)
  if (!existingCart) return res.send({ error: 'No cart found for that id' })

  // delete Item from cart
  existingCart.items = existingCart.items.filter((item) => item.id !== itemId)

  // recalculate the subtotal
  existingCart.subtotal = existingCart.items
    .map((item) => parseFloat(item.price * parseFloat(item.qty)))
    .reduce((acc, curr) => (acc += curr), 0)

  try {
    await Cart.findByIdAndUpdate(id, existingCart)
    return res.send({ msg: 'Item deleted from cart!' })
  } catch (error) {
    return res.send({ error: error.message })
  }
})


export default router
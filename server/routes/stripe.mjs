import express, { Router } from 'express'
//import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Stripe from 'stripe'
import Cart from '../models/cart.mjs'
import Addresses from '../models/addresses.mjs'
import Order from '../models/orders.mjs'
import {} from 'dotenv/config'

const router = Router()


const checkIfConnected = (req, res, next) => {
  req.user ? next() : res.send({ error: 'Your are not an connected!' })
}

// Instantiate Stripe
const stripe = new Stripe(
  process.env.STRIPE_KEY
)

// Calculate amount for items
const calculateOrderAmount = (items) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  const total = items
    .map((item) => parseFloat(item.price * parseFloat(item.qty)))
    .reduce((acc, curr) => (acc += curr), 0)
  return total
}








// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;


router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (request, response) => {
    const sig = request.headers['stripe-signature']

    let event

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret)
      //console.log(event.type)
      // Handle the event
      switch (event.type) {
        case 'payment_intent.created':
          const paymentIntentCreated = event.data.object
          //console.log(paymentIntentCreated)
          break
        case 'payment_intent.succeeded':
          const paymentIntentSucceeded = event.data.object
          //console.log(paymentIntentSucceeded)
            
            // Then define and call a function to handle the event payment_intent.succeeded
           await handlePaymentIntentSucceeded(paymentIntentSucceeded)
          
        
          async function handlePaymentIntentSucceeded(payment_intent) {
            
           
            try {
              const cart = await Cart.findById(
                mongoose.Types.ObjectId.createFromHexString(
                  payment_intent.metadata.cart
                )
              )
              const address = await Addresses.findById(
                mongoose.Types.ObjectId.createFromHexString(
                  payment_intent.metadata.address
                )
              )
              const orderObj = {
                cart: cart,
                user: JSON.parse(payment_intent.metadata.user),
                address: address,
                total: parseFloat(payment_intent.metadata.total),
                payment: payment_intent.id,
              }
              //console.log(orderObj)
              //console.log(orderObj);
              const order = new Order(orderObj)
              await order.save()
              cart.items = []
              cart.subtotal = 0
              
              await Cart.findByIdAndUpdate(cart._id, cart)
              
              //return order
            } catch (error) {
             console.log(error.message);
            }

            //return order
          }

          break
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`)
      }

      // Return a 200 response to acknowledge receipt of the event
      response.send()
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`)
      return
    }
  }
)
router.use(express.json())

//router.use(checkIfConnected)
router.post('/create-payment-intent', checkIfConnected, async (req, res) => {
  const { addressId } = req.query

  // Get items
  try {
    // get the order ready
    const address = await Addresses.findById(addressId)
    if (!address) return res.send({ error: 'Wrong Address' })
    //console.log(address)
    // Get the user
    const user = {
      user_id: req.user.id,
      email: req.user.email,
      picture: req.user.picture,
      phone: req.user.phone
    }

    const cart = await Cart.find({ user_id: req.user.id })
    const items = cart[0].items
    const total = calculateOrderAmount(items)
    const order = {
      cart: cart[0]._id.toString(),
      address: address._id.toString(),
      user: JSON.stringify(user),
      total: total.toString(),
    }

    // console.log(order)
    if (items.length <= 0) return res.send({ error: 'No cart items found' })
    //console.log(calculateOrderAmount(items))
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(total * 100),
      currency: 'usd',
      metadata: order,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    })

    res.send({
      clientSecret: paymentIntent.client_secret,
      // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
     // dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    })
  } catch (error) {
    return res.send({ error: error.message })
  }
})





export default router

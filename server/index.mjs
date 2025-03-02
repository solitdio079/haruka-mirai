import express from 'express'
import mongoose from 'mongoose'
import authRouter from './routes/auth.mjs'
import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import adminRouter from './routes/admin.mjs'
import productRouter from './routes/product.mjs'
import cartRouter from './routes/cart.mjs'
import categoriesRouter from './routes/categories.mjs'
import addressesRouter from './routes/addresses.mjs'
import stripeRouter from './routes/stripe.mjs'
import ordersRouter from './routes/orders.mjs'
import profileRouter from './routes/userProfile.mjs'
import salesClientRouter from './routes/saleClient.mjs'
import path from 'node:path'



const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://harukamirai.org',
    'https://www.harukamirai.org',
  ],

  credentials: true,
  optionsSuccessStatus: 200,
}



try {
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log('Database connected')
} catch {
    console.log("Error occured");
}


const app = express()
app.use(cors(corsOptions))

app.use(cookieParser('yes'))
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      dbName: 'mern-starter',
    }),
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use("/",express.static('./public'))
app.use('/stripe', stripeRouter)
app.use('/profile', profileRouter)


app.use('/admin', adminRouter)
app.use(express.json())
app.use('/auth', authRouter)
app.use('/product', productRouter)

app.use('/cart', cartRouter)
app.use('/categories', categoriesRouter)
app.use('/addresses', addressesRouter)
app.use('/orders', ordersRouter)
app.use('/sales', salesClientRouter)
const port = process.env.PORT || 5500

app.get("/", (req, res) => {
    res.send("Hello, homepage here!")
})


app.listen(port, () => {
    console.log("Listening to port 5500!");
})
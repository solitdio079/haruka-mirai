import express, { Router } from 'express'
import Product from '../models/products/products.mjs'
import Clothing from '../models/products/clothing.mjs'
import Furniture from '../models/products/furniture.mjs'

const router = Router()


const pickType = (type) => {
    switch (type) {
        case 'clothing':
            return Clothing
            break;
        case 'furniture':
            return Furniture
            break
        default:
            return Product
            break;
    }
}



router.get("/", async (req, res) => {
    const { cursor, limit, type, price } = req.query
   // console.log(price)
    const query = {}
    let filter = null
    if (cursor) {
        query._id = {$gt: cursor}
    }
    if (price === 'asc') {
      filter = { sort: { price: 1 } }
    }
    if (price === 'desc') {
     filter = { sort: { price: -1 } }
    }
    //console.log(filter);
    try {
        const items = await pickType(type).find(query,null,filter).limit(Number(limit))
        return res.send(items)
        
    } catch (error) {
        return res.send({error: error.message})
    }
})

// get by Search terms

router.get("/search", async (req, res) => {
    const { q,cursor, limit, price } = req.query
    ///console.log(price)
    const query = { name: { $regex: new RegExp(`${q}`, 'i') } }
    const filter = {limit: Number(limit)}
    if (cursor) {
        query._id = {$gt: cursor}
    }
     if (price === 'asc') {
       filter.sort= { price: 1 } 
     }
     if (price === 'desc') {
       filter.sort = { price: -1 } 
     }
    //console.log(filter)
    try {
        const searchResults = await Product.find(query, null, filter)
        return res.send(searchResults)
        
    } catch (error) {
        return res.send({error: error.message})
    }
})
//
router.get("/single/:id", async (req, res) => {
  const { id } = req.params
  
  try {
     const singleProduct =
       (await Product.findById(id)) ||
       (await Clothing.findById(id)) ||
       (await Furniture.findById(id))
    if (!singleProduct) res.send({ error: `No product with ID:${id}` })
    return res.send(singleProduct)
  } catch (error) {
    return res.send({error: error.message})
  }
})
// get Product by sales
router.get('/sales/:salesId', async (req, res) => {
  const {salesId} = req.params
  const { cursor, limit, price } = req.query

  const query = { 'onSale.sales_id': salesId }
  const filter = { limit: Number(limit) }
  if (cursor) {
    query._id = { $gt: cursor }
  }
  if (price === 'asc') {
    filter.sort = { price: 1 }
  }
  if (price === 'desc') {
    filter.sort = { price: -1 }
  }
  //console.log(query)
  try {
    const salesProducts = await Product.find(query, null, filter)
    return res.send(salesProducts)
  } catch (error) {
    return res.send({ error: error.message })
  }
})
// Get last 6 products
router.get("/last6", async (req, res) => {
  try {
    const last6 = await Product.find().sort({ _id: -1 }).limit(6)
    return res.send(last6)
    
  } catch (error) {
    return res.send({error: error.message})
  }
})

// get all product from categories
router.get("/:categoryId", async (req, res) => {
    const { categoryId } = req.params
    //console.log(categoryId)
    const { cursor, limit, price } = req.query
    //console.log(cursor)
    const query = { 'category.category_id': categoryId }
    let filter = null
    if (cursor) {
        query._id = {$gt: cursor}
    }
    if (price === "asc") {
        filter ={ sort :{price: 1} }
    }
    if (price === 'desc') {
        filter = {sort: {price: -1 }}
    }
    try {
        const products = await Product.find(query,null, filter).limit(Number(limit)) 
        //console.log(products)
        return res.send(products)
        
    } catch (error) {
        return res.send({error: error.message})
    }
})













export default router
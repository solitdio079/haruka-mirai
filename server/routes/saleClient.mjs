import { Router } from "express";
import Sales from "../models/sales.mjs";



const router = Router()

// Get all SALES
router.get("/", async (req, res) => {
  try {
    const allSales = await Sales.find({
      expires: { $gt: new Date(Date.now()).toISOString() },
    })
    return res.send(allSales)
  } catch (error) {
    return res.send({error: error.message})
  }
})

export default router
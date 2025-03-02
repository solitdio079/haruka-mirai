import { Router } from 'express'

import Category from '../models/categories.mjs'


const router = Router()


// get all the categories

router.get("/", async (req, res) => {
    try {
        const allCategories = await Category.find()
        return res.send(allCategories)
    } catch (error) {
        return res.send({error: error.message})
    }
})

export default router
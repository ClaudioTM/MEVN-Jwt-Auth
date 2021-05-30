const { Router } = require('express')
const FoodItem = require('../models/FoodItem')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const foodItems = await FoodItem.find()
        if (!foodItems) throw new Error('No FoodItems')
        const sorted = foodItems.sort((a, b) => {
            return new Date(a.Date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newFoodItem = new FoodItem(req.body)
    try {
        const foodItem = await newFoodItem.save()
        if (!foodItem) throw new Error('Something went wrong saving the foodItem')
        res.status(200).json(foodItem)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await FoodItem.findByIdAndUpdate(id, req.body)
        if (!response) throw Error('Something went wrong ')
        const updated = { ... response._doc, ... req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await FoodItem.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
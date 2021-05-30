const { Schema, model } = require('mongoose')

const FoodItemSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    price: {
        type: String,
        require: true,
    },
})

const FoodItem = model('foodItem', FoodItemSchema)

module.exports = FoodItem
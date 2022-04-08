const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
    cocktail: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cocktail',
    },
    title: {
        required: true,
        type: String,
    },
    amount: {
        required: true,
        type: String,
        enum: ['ml', 'pc', 'shot', 'pinch'],
    }
});

const Ingredient = new mongoose.model('Ingredient', IngredientSchema);

module.exports = Ingredient;
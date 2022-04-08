const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CocktailSchema = new Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        required: true,
        type: String,
    },
    recipe: {
        required: true,
        type: String,
    },
    isPublished: {
        required: true,
        type: Boolean,
        default: false,
    },
    ingredients: {
        type: [{
            ingredientName: String,
            ingredientAmount: String,
        }],
        required: true,
    },
    image: {
        required: true,
        type: String,
    },
});

const Cocktail = new mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;
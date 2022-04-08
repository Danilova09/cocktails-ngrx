const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const IngredientSchema = new mongoose.Schema({
//     cocktail: {
//         required: true,
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Cocktail',
//     },
//     title: {
//         required: true,
//         type: String,
//     },
//     amount: {
//         required: true,
//         type: String,
//         enum: ['ml', 'pc', 'shot', 'pinch'],
//     }
// });

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
        default: undefined,
    },
    image: {
        required: true,
        type: String,
    },
});

const Cocktail = new mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;
const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const multer = require("multer");
const config = require('../config');
const {nanoid} = require("nanoid");
const Cocktail = require('../models/Cocktail');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const {mongo} = require("../config");
const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.cocktailsUploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try {
        const cocktails = await Cocktail.find();
        res.send(cocktails);
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, permit('user', 'admin'), upload.single('image'), async (req, res, next) => {
    try {
        const ingredients = JSON.parse(req.body.ingredients);
        const cocktailData = {
            user: req.body.user,
            name: req.body.name,
            recipe: req.body.recipe,
            isPublished: (req.user.role === 'admin'),
            ingredients: ingredients,
        }

        if (req.file) {
            cocktailData.image = req.file.filename;
        }

        if (!req.file) {
            return res.status(400).send({error: 'Image is required!'});
        }
        const cocktail = new Cocktail(cocktailData);
        cocktail.save();

        return res.send(cocktail);
    } catch (e) {
        next(e);
    }
});


router.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send({error: 'invalid id'});
        }

        const cocktail = await Cocktail.findById(req.params.id);

        if (!cocktail) {
            return res.status(400).send({error: `Cocktails with id = ${req.params.id} wasnt found!`})
        }
        cocktail.deleteOne();
        return res.send({message: 'Successfully deleted!'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;
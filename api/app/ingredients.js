const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    res.send({message: 'ingredients'});
});

router.post('/', async (req, res, next) => {
    console.log(req.body);
    res.send({message: 'new ingredient'});
});

module.exports = router;
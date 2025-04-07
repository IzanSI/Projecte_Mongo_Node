const express = require('express');
const Hoguera = require('../models/Hogueras');
const router = express.Router();

router.get('/', async (req, res) => {
    const hogueras = await Hoguera.find();
    res.json(hogueras);
});

router.post('/', async (req, res) => {
    const nuevaHoguera = new Hoguera(req.body);
    await nuevaHoguera.save();
    res.status(201).json(nuevaHoguera);
});
module.exports = router;